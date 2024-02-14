document.addEventListener('DOMContentLoaded', function () {
  fetchMovies("Best-movies", "http://localhost:8000/api/v1/titles/?format=json&sort_by=-imdb_score&page_size=1");
  fetchMovies("top-movies", "http://localhost:8000/api/v1/titles/?format=json&sort_by=-imdb_score&page_size=7");
  fetchMovies("sci-fi-movies", "http://localhost:8000/api/v1/titles/?format=json&sort_by=-imdb_score&genre=sci-fi&page_size=7");
  fetchMovies("romance-movies", "http://localhost:8000/api/v1/titles/?format=json&sort_by=-imdb_score&genre=romance&page_size=7");
  fetchMovies("drama-movies", "http://localhost:8000/api/v1/titles/?format=json&sort_by=-imdb_score&genre=drama&page_size=7");
});

function fetchMovies(containerId, apiUrl) {
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          const container = document.getElementById(containerId).querySelector('.movies');
          data.results.forEach(movie => {
              const movieElement = createMovieElement(movie);
              container.appendChild(movieElement);
          });
      })
      .catch(error => console.log('Error fetching movies:', error));
}

function createMovieElement(movie) {
  const movieElement = document.createElement('div');
  movieElement.classList.add('movie');

  const titleElement = document.createElement('h3');
  titleElement.textContent = movie.title;
  movieElement.appendChild(titleElement);

  const imageElement = document.createElement('img');
  imageElement.src = movie.image_url;
  imageElement.alt = movie.title;
  movieElement.appendChild(imageElement);

  const playButton = document.createElement('button');
  playButton.textContent = 'Play';
  movieElement.appendChild(playButton);

  const moreButton = document.createElement('button');
  moreButton.textContent = 'More Info';
  moreButton.addEventListener('click', function() {
      openModal(movie.id);
  });
  movieElement.appendChild(moreButton);

  return movieElement;
}

function openModal(movieId) {
  fetch(`http://localhost:8000/api/v1/titles/${movieId}?format=json`)
  .then(response => response.json())
  .then(movie => {
      const modal = document.getElementById('modal');
      const modalInfo = document.getElementById('modal-info');
      modalInfo.innerHTML = `<h2>${movie.title}</h2>
                             <p><strong>Date de sortie:</strong> ${movie.date_published}</p>
                             <p><strong>IMDb Score:</strong> ${movie.imdb_score}</p>`;
      if (movie.image_url) {
          modalInfo.innerHTML += `<img src=${movie.image_url}>`;
      }
      
      if (movie.genres) {
          modalInfo.innerHTML += `<p><strong>Genre:</strong> ${movie.genres.join(', ')}</p>`;
      }

      if (movie.directors) {
          modalInfo.innerHTML += `<p><strong>Réalisateur:</strong> ${movie.directors.join(', ')}</p>`;
      }

      if (movie.actors) {
          modalInfo.innerHTML += `<p><strong>Acteurs:</strong> ${movie.actors.join(', ')}</p>`;
      }

      if (movie.duration) {
          modalInfo.innerHTML += `<p><strong>Durée:</strong> ${movie.duration} minutes</p>`;
      }
      if (movie.reviews_from_users) {
          modalInfo.innerHTML += `<p><strong>Note Spectateurs:</strong> ${movie.reviews_from_users}</p>`;
      }
      if (movie.countries) {
          modalInfo.innerHTML += `<p><strong>Pays (origine):</strong> ${movie.countries.join(', ')}</p>`;
      }

      if (movie.worldwide_gross_income) {
          modalInfo.innerHTML += `<p><strong>Box Office:</strong> ${movie.worldwide_gross_income}</p>`;
      }

      if (movie.description) {
          modalInfo.innerHTML += `<p><strong>Résumé:</strong> ${movie.description}</p>`;
      }

      modal.style.display = 'block';

      const closeButton = document.getElementsByClassName('close')[0];
      closeButton.addEventListener('click', function() {
          closeModal();
      });

      window.addEventListener('click', function(event) {
          if (event.target === modal) {
              closeModal();
          }
      });
  })
  .catch(error => console.log('Error fetching movie details:', error));
}
  //modal.style.display = 'block';

  const closeButton = document.getElementsByClassName('close')[0];
  closeButton.addEventListener('click', function() {
      closeModal();
  });

  window.addEventListener('click', function(event) {
      if (event.target === modal) {
          closeModal();
      }
  });


function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  const modalInfo = document.getElementById('modal-info');
  modalInfo.innerHTML = '';
}
