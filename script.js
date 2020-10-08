let API_KEY = "19f84e11932abbc79e6d83f82d6d1045";

window.onload = () => {
  fetchOriginalMovies();
  fetchTrendingMovies();
  fetchTopMovies();
  fetchGenreMovies();
};

function fetchMovies(url, elementSelector, pathway) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong!");
      }
    })
    .then((data) => {
      showMovies(data, elementSelector, pathway);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showMovies(movies, className, pathType) {
  let moviesEl = document.querySelector(`${className}`);
  for (let movie of movies.results) {
    if (movie !== null) {
      let img = `<img src="https://image.tmdb.org/t/p/original//${movie[pathType]}"/>`;
      moviesEl.innerHTML += img;
    } else {
      console.log(movie);
    }
  }
}

function extractAllGenresIdAndName(all_genres) {
  all_genres.genres.map((genre) => {
    if (genre !== null) {
      let genre_name_fix = genre.name.replace(/\s+/g, "").toLowerCase();
      console.log(genre.name, ": ", genre_name_fix);
      let genre_url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre.id}`;
      fetchMovies(genre_url, `.genre_${genre_name_fix}`, "backdrop_path");
    } else {
      console.log(genre);
    }
  });
}

function fetchOriginalMovies() {
  let url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`;
  fetchMovies(url, ".original__movies", "poster_path");
}

function fetchTrendingMovies() {
  let url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
  fetchMovies(url, ".trending_now", "backdrop_path");
}

function fetchTopMovies() {
  let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
  fetchMovies(url, ".top_rated", "backdrop_path");
}

function fetchGenreMovies() {
  genres_url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  // now fetch each genre movie
  fetch(genres_url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong!");
      }
    })
    .then((data) => {
      extractAllGenresIdAndName(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
