import React, { Component } from "react";
import { getMovies } from "../services/fakeMoviesService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";

// TODO take an input -> update the state ->
// TODO from state take search query -> filter movies based on that query
// * *  keep in mind that when a genre is selected  clear query
// * * and when query is selected clear the genre in list group.

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "1",
    sortColumn: { path: "title", order: "asc" },
    input: "",
  };
  componentDidMount() {
    console.log("getting data from database");
    this.setState({ movies: getMovies(), genres: getGenres() });
    console.log("got data from database");
  }
  styles = {
    fontSize: 20,
  };
  handleDelete = (m) => {
    const movies = this.state.movies.filter((movie) => movie._id !== m._id);
    this.setState({ movies: movies });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (id) => {
    this.setState({ selectedGenre: id, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleInputChange = () => {
    // TODO
  };
  getPagedData() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;
    const filtered =
      selectedGenre !== "1"
        ? allMovies.filter((m) => m.genre._id === selectedGenre)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  }
  render() {
    const count = this.state.movies.length;
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: movies } = this.getPagedData();

    if (count === 0)
      return <p style={this.styles}>There are no movies in database</p>;
    return (
      <div className="row m-5">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <Link
            className="btn btn-primary"
            to="/movies/new"
            style={{ textDecoration: "none", color: "white" }}
          >
            New Movie
          </Link>
          <p style={this.styles}>showing {totalCount} movies in database</p>
          <input
            className="form-control"
            type="text"
            value={this.state.input}
            onChange={this.handleInputChange}
          />{" "}
         {/* // TODO*/}
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
