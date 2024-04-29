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
  const { title, overview, poster_path, vote_average } = movie;

  // 필요한 속성 doc를 이용해 만들기
  const card = document.createElement("div");
  const image = document.createElement("img");
  const titleElement = document.createElement("h2");
  const overviewElement = document.createElement("p");
  const voteAverageElement = document.createElement("p");

  //   생성된 dom 요소들에 클래스 이름을 설정해요 ...
  card.className = "movie-card";
  image.className = "poster-image";
  titleElement.className = "title";
  overviewElement.className = "overview";
  voteAverageElement.className = "vote-average";

  // 이미지 속성값과 텍스트 콘텐츠를 설정해줘요....
  // vote average 는 나중에 평점이나 ratings 로 바꿔줄거에요... 일단은 저렇게 해두고..
  image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  titleElement.textContent = title;
  overviewElement.textContent = overview;
  voteAverageElement.textContent = `Rating: ${vote_average}`;

  //appendchild로 넣어버려요....
  // 그리고 이 생성된 영화 카드를 반환합니다. 어디로?
  // 이제 만들어야죠....
  card.appendChild(image);
  card.appendChild(titleElement);
  card.appendChild(overviewElement);
  card.appendChild(voteAverageElement);

  return card;
};

// 영화 정보를 화면에 나타내주는 함수..
const renderMovies = (movies) => {
  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    moviesContainer.appendChild(movieCard);
  });
};

// API 호출 및 영화 정보 처리
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    // 영화 정보를 화면에 렌더링
    renderMovies(response.results);
  })
  .catch((err) => console.error(err));
