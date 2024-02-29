const baseUrl =
  "http://localhost:8000/api/v1/titles/?format=json&sort_by=-imdb_score&page_size=";

  
let category_1 = "top-movies";
let category_2 = "sci-fi-movies";
let category_3 = "romance-movies";
let category_4 = "drama-movies";
const list_categories = [category_1, category_2, category_3, category_4];
// document.addEventListener("DOMContentLoaded", function () {
//   fetchBestMovies("Best-movies", baseUrl + "1");
//   fetchMovies(category_1, baseUrl + "7");
//   fetchMovies(category_2, baseUrl + "7&genre=sci-fi");
//   fetchMovies(category_3, baseUrl + "7&genre=romance");
//   fetchMovies(category_4, baseUrl + "7&genre=drama");
// });

function fetchBestMovies(containerId, apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      fetch(data["results"][0]["url"])
        .then((response) => response.json())
        .then((movieData) => {
          // console.log(movieData);
          const container = document.getElementById(containerId);
          const titleElement = document.createElement("h1");
          titleElement.textContent = movieData.title;
          container.appendChild(titleElement);
          let playButton = document.getElementById("button_play");
          playButton.textContent = "Play";
          container.appendChild(playButton);

          let imageElement = document.getElementById("bestImage");
          imageElement.src = movieData.image_url;
          container.appendChild(imageElement);
          const bestDescriptionElement = document.createElement("li");
          bestDescriptionElement.textContent = movieData.description;
          container.appendChild(bestDescriptionElement);
          const moreButton = document.getElementById("btn-best-movie");
          moreButton.textContent = "More Info";
          moreButton.addEventListener("click", function () {
            openModal(movieData.id);
          });
          // Update best movie description
        })
        .catch((error) => {
          console.error("Error fetching best movies:", error);
        });
    });
}

// function fetchMovies(containerId, apiUrl) {
//   fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       const container = document
//         .getElementById(containerId)
//         .querySelector(".movies");

//       data.results.forEach((movie, index) => {
//         const movieElement = createMovieElement(movie, index, containerId);
//         container.appendChild(movieElement);
//         // console.log(index);
//         // console.log(maListe[index]);
//         // for (var i = 0; i < maListe.length; i++) {
//         //   console.log(maListe[i]);}
//       });
//     })
//     .catch((error) => console.log("Error fetching movies:", error));
// }
document.addEventListener("DOMContentLoaded", function () {
  
  fetchBestMovies("Best-movies", baseUrl + "1");
  list_categories.forEach((category) => {
    fetchMovies(category, baseUrl + "7" + getGenreQueryString(category));
  });
});

function fetchMovies(category, apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const container = document
        .getElementById(category)
        .querySelector(".movies");

      data.results.forEach((movie, index) => {
        const movieElement = createMovieElement(movie, index, category);
        container.appendChild(movieElement);
      });

      // Ajouter un gestionnaire d'événements pour chaque carrousel
      const carousel = document
        .getElementById(category)
        .querySelector(".movies");
      const prevButton = document
        .getElementById(category)
        .querySelector(".left");
      const nextButton = document
        .getElementById(category)
        .querySelector(".right");

      prevButton.addEventListener("click", function () {
        shiftCarousel(carousel, "left");
      });

      nextButton.addEventListener("click", function () {
        shiftCarousel(carousel, "right");
      });
    })
    .catch((error) => console.log("Error fetching movies:", error));
}

function shiftCarousel(carousel, direction) {
  const scrollDistance = 500; // Réglage de la distance de défilement,
  if (direction === "left") {
    carousel.scrollLeft -= scrollDistance;
  } else {
    carousel.scrollLeft += scrollDistance;
  }
}

function getGenreQueryString(category) {
  switch (category) {
    case category_1:
      return "";
    case category_2:
      return "&genre=sci-fi";
    case category_3:
      return "&genre=romance";
    case category_4:
      return "&genre=drama";
    default:
      return "";
  }
}

function createMovieElement(movie, index, containerId) {



  const movieElement = document.createElement("div");
  movieElement.classList.add("movie");

  const containerIdElement = document.createElement("div");
  containerIdElement.classList.add(containerId);
  // console.log(containerId);
  const titleElement = document.createElement("h4");
  titleElement.textContent = movie.title;
  movieElement.appendChild(titleElement);

  const imageElement = document.createElement("img");
  imageElement.classList.add("image")
  imageElement.src = movie.image_url;
  imageElement.alt = movie.title;
  imageElement.setAttribute("data-index", index); // Ajouter un attribut data-index pour suivre l'index
  movieElement.appendChild(imageElement);
  console.log(containerId, "data-index", index);
  const playButton = document.createElement("button");
  playButton.textContent = "Play";
  movieElement.appendChild(playButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "More Info";
  moreButton.addEventListener("click", function () {
    openModal(movie.id);
  });
  movieElement.appendChild(moreButton);

  return movieElement;
}

function openModal(movieId) {
  fetch(`http://localhost:8000/api/v1/titles/${movieId}?format=json`)
    .then((response) => response.json())
    .then((movie) => {
      const modal = document.getElementById("modal");
      const modalInfo = document.getElementById("modal-info");
      modalInfo.innerHTML = `<h2>${movie.title}</h2>
                             <p><strong>Date de sortie:</strong> ${movie.date_published}</p>
                             <p><strong>IMDb Score:</strong> ${movie.imdb_score}</p>`;
      if (movie.image_url) {
        modalInfo.innerHTML += `<img src=${movie.image_url}>`;
      }

      if (movie.genres) {
        modalInfo.innerHTML += `<p><strong>Genre:</strong> ${movie.genres.join(
          ", "
        )}</p>`;
      }

      if (movie.directors) {
        modalInfo.innerHTML += `<p><strong>Réalisateur:</strong> ${movie.directors.join(
          ", "
        )}</p>`;
      }

      if (movie.actors) {
        modalInfo.innerHTML += `<p><strong>Acteurs:</strong> ${movie.actors.join(
          ", "
        )}</p>`;
      }

      if (movie.duration) {
        modalInfo.innerHTML += `<p><strong>Durée:</strong> ${movie.duration} minutes</p>`;
      }
      if (movie.reviews_from_users) {
        modalInfo.innerHTML += `<p><strong>Note Spectateurs:</strong> ${movie.reviews_from_users}</p>`;
      }
      if (movie.countries) {
        modalInfo.innerHTML += `<p><strong>Pays (origine):</strong> ${movie.countries.join(
          ", "
        )}</p>`;
      }

      if (movie.worldwide_gross_income) {
        modalInfo.innerHTML += `<p><strong>Box Office:</strong> ${movie.worldwide_gross_income}</p>`;
      }

      if (movie.description) {
        modalInfo.innerHTML += `<p><strong>Résumé:</strong> ${movie.description}</p>`;
      }

      modal.style.display = "block";

      const closeButton = document.getElementsByClassName("close")[0];
      closeButton.addEventListener("click", function () {
        closeModal();
      });

      window.addEventListener("click", function (event) {
        if (event.target === modal) {
          closeModal();
        }
      });
    })
    .catch((error) => console.log("Error fetching movie details:", error));
}
// modal.style.display = 'block';

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  const modalInfo = document.getElementById("modal-info");
  modalInfo.innerHTML = "";
}

// Détection du scroll pour afficher ou cacher le bouton "Haut de page"
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    document.getElementById("btnScrollToTop").style.display = "block";
  } else {
    document.getElementById("btnScrollToTop").style.display = "none";
  }
}

// Fonction pour remonter en haut de la page lorsque le bouton est cliqué
document
  .getElementById("btnScrollToTop")
  .addEventListener("click", function () {
    document.body.scrollTop = 0; // Pour Safari
    document.documentElement.scrollTop = 0; // Pour les autres navigateurs
  });
document.getElementById("right").addEventListener("click", function () {
  var moviesElement = document.querySelector(".movies");
  var currentLeft = parseInt(
    window.getComputedStyle(moviesElement).getPropertyValue("left")
  );
  moviesElement.style.left = currentLeft - 400 + "px";
});
document.getElementById("right").addEventListener("click", function() {
  var moviesElement = document.querySelector(".movies");
  var currentLeft = parseInt(window.getComputedStyle(moviesElement).getPropertyValue("left"));
  moviesElement.style.left = (currentLeft - 400) + "px";
});
document.getElementById("left").addEventListener("click", function () {
  var moviesElement = document.querySelector(".movies");
  var currentLeft = parseInt(
    window.getComputedStyle(moviesElement).getPropertyValue("left")
  );
  moviesElement.style.left = currentLeft + 400 + "px";
});
