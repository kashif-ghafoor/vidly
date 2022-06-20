import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { saveMovie, getMovie } from "../services/fakeMoviesService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string().allow(""),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.params.movieId || this.props.params.new;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) {
      return;
    }
    const data = this.mapToViewModel(movie);
    this.setState({ data });
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    //server call
    saveMovie(this.state.data);
    this.props.navigate("/movies");

    console.log("Form submitted");
  };
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleFormSubmission}>
          {this.renderInput("title", "Title")}
          {this.renderDropDown("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

const MovieFormWrapper = () => {
  const params = useParams();
  const navigate = useNavigate();
  return <MovieForm params={params} navigate={navigate} />;
};

export default MovieFormWrapper;
