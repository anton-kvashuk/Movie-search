import React, { Component } from 'react';
import MovieList from './MovieList';
import Nav from './Nav'
import SearchArea from './SearchArea';
import Pagination from './Pagination';
import MovieInfo from './MovieInfo';

class App extends Component {
  constructor() {
    super()
    this.state ={
      movies: [],
      searchTerm: '',
      totalResults: 0,
      currentPage: 1,
      currentMovie: null,
    }
    this.apiKey = '3c55e7b0323dc576e528420b10e3a736'
  }

  handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      this.setState({movies: [...data.results], totalResults: data.total_results})
    })
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value})
  }

  nextPage = (pageNumber) =>{
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&page=${pageNumber}`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      this.setState({movies: [...data.results], currentPage: pageNumber})
    })
  }

  viewMovieInfo = (id) =>{
    const filteredMovie = this.state.movies.filter(movie=> movie.id == id)
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null;
    this.setState({currentMovie: newCurrentMovie})
  }
  closeMovieInfo = () =>{
    this.setState({currentMovie: null})
  }

  render(){
    const numberPages = Math.floor(this.state.totalResults / 20);
  return (
    
    <div className="App">
      <Nav/>
      {this.state.currentMovie == null ? <div><SearchArea handleSubmit={this.handleSubmit} handleChange={this.handleChange}/><MovieList viewMovieInfo={this.viewMovieInfo} movies={this.state.movies}/></div> : <MovieInfo currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo}/>}
      {this.state.totalResults > 20 && this.state.currentMovie == null? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage} /> : '' }
    </div>
  );
}
}
export default App;