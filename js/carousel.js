document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch movies data and populate carousel
  function fetchAndPopulateCarousel(url, carouselId) {
      fetch(url)
          .then(response => response.json())
          .then(data => {
              const carousel = document.getElementById(carouselId);
              data.results.forEach(movie => {
                  const movieItem = document.createElement('div');
                  movieItem.classList.add('movie');
                  movieItem.innerHTML = `
                      <img src="${movie.image_url}" alt="${movie.title}" onclick="showModal(${JSON.stringify(movie)})">
                      <h3>${movie.title}</h3>
                  `;
                  carousel.appendChild(movieItem);
              });
          })
          .catch(error => console.error('Error fetching data:', error));
  }

  // Fetch and populate carousel for Comedy movies
  fetchAndPopulateCarousel('http://localhost:8000/api/v1/titles/?format=json&sort_by=-imdb_score&genre=action&page_size=7', 'comedyCarousel');

  // Fetch and populate carousel for Sci-Fi movies
  fetchAndPopulateCarousel('http://localhost:8000/api/v1/titles/?format=json&sort_by=-imdb_score&genre=sci-fi&page_size=7', 'sciFiCarousel');

  // Fetch and populate carousel for Romance movies
  fetchAndPopulateCarousel('http://localhost:8000/api/v1/titles/?format=json&sort_by=-imdb_score&genre=romance&page_size=7', 'romanceCarousel');

  // Fetch and populate carousel for top rated movies

  fetchAndPopulateCarousel('http://localhost:8000/api/v1/titles/?format=json&sort_by=-imdb_score&score_max=10&page_size=7&genre','Top_RatedCarousel');

  // Fetch and populate best of the bests

  // Function to display movie details in modal
  function showModal(movieData) {
      const modalBody = document.getElementById('modalBody');
      modalBody.innerHTML = `
          <h2>${movieData.title}</h2>
          <img src="${movieData.image_url}" alt="${movieData.title}">
          <p><strong>Genre:</strong> ${movieData.genre.join(', ')}</p>
          <p><strong>Date de sortie:</strong> ${movieData.year}</p>
          <p><strong>Rated:</strong> ${movieData.rated}</p>
          <p><strong>Score IMDB:</strong> ${movieData.imdb_score}</p>
          <p><strong>Réalisateur:</strong> ${movieData.directors.join(', ')}</p>
          <p><strong>Acteurs:</strong> ${movieData.actors.join(', ')}</p>
          <p><strong>Durée:</strong> ${movieData.duration}</p>
          <p><strong>Pays d'origine:</strong> ${movieData.countries.join(', ')}</p>
          <p><strong>Résultat au Box Office:</strong> ${movieData.worldwide_gross_income}</p>
          <p><strong>Résumé:</strong> ${movieData.description}</p>
      `;
      document.getElementById('myModal').style.display = "block";
  }

  // Modal close functionality
  const modal = document.getElementById('myModal');
  const closeModal = document.getElementsByClassName('close')[0];
  closeModal.onclick = function() {
      modal.style.display = "none";
  }
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
});
