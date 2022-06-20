import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/NavBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <main role="main" className="container">
          <Routes>
            <Route path="/" element={<Navigate replace to="/movies" />} />
            <Route path="movies" element={<Movies />}></Route>
            <Route path="movies/:new" element={<MovieForm />} />
            <Route path="movies/:movieId" element={<MovieForm />} />
            <Route path="customers" element={<Customers />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
