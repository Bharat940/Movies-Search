const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");

const defaultTopMovies = [
  {
    title: "The Shawshank Redemption",
    year: "1994",
    poster: "https://posters.movieposterdb.com/05_03/1994/0111161/l_8494_0111161_3bb8e662.jpg",
  },
  {
    title: "The Godfather",
    year: "1972",
    poster: "https://posters.movieposterdb.com/22_07/1972/68646/l_68646_8c811dec.jpg",
  },
  {
    title: "The Dark Knight",
    year: "2008",
    poster: "https://posters.movieposterdb.com/08_06/2008/468569/l_468569_fe24b125.jpg",
  },
  {
    title: "Inception",
    year: "2010",
    poster: "https://posters.movieposterdb.com/10_06/2010/1375666/l_1375666_07030c72.jpg",
  },
  {
    title: "Forrest Gump",
    year: "1994",
    poster: "https://posters.movieposterdb.com/12_04/1994/109830/s_109830_58524cd6.jpg",
  },
  {
    title: "Pulp Fiction",
    year: "1994",
    poster: "https://posters.movieposterdb.com/20_10/1994/110912/s_110912_40e7dce0.jpg",
  },
  {
    title: "Fight Club",
    year: "1999",
    poster: "https://posters.movieposterdb.com/22_12/2004/415800/l_fight-club-movie-poster_1332899c.jpg",
  },
  {
    title: "The Lord of the Rings",
    year: "2003",
    poster: "https://posters.movieposterdb.com/07_11/1978/77869/l_77869_a25a69d9.jpg",
  },
  {
    title: "Interstellar",
    year: "2014",
    poster: "https://posters.movieposterdb.com/14_09/2014/816692/l_816692_2beaba6e.jpg",
  },
  {
    title: "The Matrix",
    year: "1999",
    poster: "https://posters.movieposterdb.com/22_10/1993/106062/l_matrix-movie-poster_24ff14fa.jpg",
  },
];

const apiKey = import.meta.env.VITE_API_KEY;
const apiHost = import.meta.env.VITE_API_HOST;
async function getResponse(movie, exact, limit) {
  const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${movie}?exact=${exact}&sort=year.decr&titleType=movie&limit=${limit}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": apiHost,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    console.log(result);
    const movies = result.results || [];

    movies.forEach((movie) => {
      const card = createMovieCard(movie);
      moviesContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
}

function createMovieCard(movie) {
  const title = movie.titleText?.text || "Untitled";
  const year = movie.releaseYear?.year || "Unknown";
  const poster =
    movie.primaryImage?.url ||
    "https://placehold.co/120x270?text=Image+Not+Found";

  const card = document.createElement("div");
  card.classList.add("movie-card");

  card.innerHTML = `
  <img src="${poster}" alt="${title}"></img>
  <div class="movie-info">
    <h3 class="movie-title">${title}</h3>
    <p class="movie-year">${year}</p>
  </div>`;

  return card;
}

function renderDefaultTopMovies() {
  moviesContainer.innerHTML = "";
  defaultTopMovies.forEach((movie) => {
    const card = createStaticMovieCard(movie);
    moviesContainer.appendChild(card);
  });
}

function createStaticMovieCard(movie) {
  const card = document.createElement("div");
  card.classList.add("movie-card");

  card.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}"></img>
    <div class="movie-info">
      <h3 class="movie-title">${movie.title}</h3>
      <p class="movie-year">${movie.year}</p>
    </div>`;

  return card;
}
function checkSearch() {
  const search = searchInput.value.trim();
  if (!search) {
    renderDefaultTopMovies();
  } else {
    moviesContainer.innerHTML = "";
    getResponse(search, false, 20);
  }
}

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  checkSearch();
});

window.addEventListener("load", () => {
  checkSearch();
});
