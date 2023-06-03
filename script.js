//Fetching

const API_KEY = 'api_key=1cbb271eeb4c2f074e2249e572ec46b5';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('movie-details');
      container.innerHTML = '';

      data.results.forEach(movie => {
        const { title, release_date, overview, poster_path } = movie;

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
          <div class="title">${title}</div>
          <img src="https://image.tmdb.org/t/p/w500${poster_path}" width="200" alt="${title} Poster">
        `;

        container.appendChild(movieElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

//SearchBar

const searchButton = document.querySelector('.search-bar button');
searchButton.addEventListener('click', searchMovies);

function searchMovies() {
  const searchInput = document.querySelector('.search-bar input').value;
  const searchUrl = `${BASE_URL}/search/movie?${API_KEY}&query=${searchInput}`;

  getMovies(searchUrl);
}