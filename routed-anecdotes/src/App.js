import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'


const AnecdoteList = ({ anecdotes }) => (
  <div className="row">
    <div className="col-sm-12 py-3">
      <h2>Anecdotes</h2>
      <ul className="list-group">
        {anecdotes.map(anecdote =>
          <li className="list-group-item" key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content} </Link>
          </li>
        )}
      </ul>  
    </div>
  </div>
)

const Anecdote = ({ anecdote: { author, content, id, info, votes }}) => (
  <div className="row">
    <div className="col-sm-12 py-3">
      <h2>{content} by {author}</h2>
      <p>has <span class="badge badge-pill badge-success mx-1">{votes}</span> votes
      </p>
      <p>for more info see <a href={info}>{info}</a></p>
    </div>
  </div>
)

const Notification = ({message}) => (
  message ? <div className="alert alert-success" role="alert">{message}</div> : null
)

const About = () => (
  <React.Fragment>
    <div className="row">
      <div className="col-sm-8 py-3">
        <h2>About anecdote app</h2>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-8">
        <p>According to Wikipedia:</p>
        
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </div>
      <div className="col-sm-4">
        <img className="img-fluid rounded" src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />
      </div>
    </div>
  </React.Fragment>
)

const Footer = () => (
  <div className="row">
    <div className="col-sm-12 py-3">
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
    this.props.notify(`a new anecdote ${this.state.content} created`)
  }

  render() {
    return(
      <div className="row">
        <div className="col-sm-12 py-3">
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            content 
            <input className="form-control" name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            author
            <input className="form-control" name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            url for more info
            <input className="form-control" name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button className="btn btn-primary">create</button>
        </form>
        </div>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 23,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  addNotification = (message) => {
    this.setState({ notification: message })
    setTimeout(() => this.setState({ notification: undefined }), 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className="container">
        <h1>Software anecdotes</h1>
        <Router>
          <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark"> 
              <div className="navbar-nav mt-2 mt-sm-0">
              <NavLink className="nav-link" exact to="/">anecdotes</NavLink> &nbsp;
              <NavLink className="nav-link" to="/create">create new</NavLink> &nbsp;
              <NavLink className="nav-link" to="/about">about</NavLink> &nbsp;
              </div>
            </nav>
            <Notification message={this.state.notification} />

            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} /> } />
            <Route path="/create" render={({ history }) =>
              <CreateNew addNew={this.addNew} history={history} notify={this.addNotification}/>}
            />
            <Route path="/about" render={() => <About /> }/>

            <Route exact path="/anecdotes/:id" render={({match}) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>
          </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
