const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWE1M2U5NWI0ZGRmMDljOTJjNzA5NDgxNDY5MzBhNCIsInN1YiI6IjY2MmEyZjE1ZDE4YjI0MDA5YmRlMTRiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h16P0dP6Y2w1lEHJHcAfIiS2Cle836gPAcwFFgm3kd0",
  },
};

// 무비 카드가 들어 갈 함수 만들기
const moviesContainer = document.getElementById("movies-container");

//화살표 함수.... 너무 헷갈린다..
const createMovieCard = (movie) => {
  const { id, title, overview, poster_path, vote_average } = movie; //

  const card = document.createElement("div");
  const image = document.createElement("img");
  const titleElement = document.createElement("h2");
  const overviewElement = document.createElement("p");
  const voteAverageElement = document.createElement("p");

  card.className = "movie-card";
  image.className = "poster-image";
  titleElement.className = "title";
  overviewElement.className = "overview";
  voteAverageElement.className = "vote-average";

  image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  titleElement.textContent = title;
  overviewElement.textContent = overview;
  voteAverageElement.textContent = `Rating: ${vote_average}`;

  image.addEventListener("click", () => {
    alert(`영화 ID: ${id}`);
  });

  card.appendChild(image);
  card.appendChild(titleElement);
  card.appendChild(overviewElement);
  card.appendChild(voteAverageElement);

  return card;
};

const renderMovies = (movies) => {
  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    moviesContainer.appendChild(movieCard);
  });
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    renderMovies(response.results);
  })
  .catch((err) => console.error(err));
