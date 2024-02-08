const TOP_URL = API_URL + "?format=json&sort_by=-imdb_score&genre"
const url = API_URL + "romance"
const getData = async (url, params) => {
    return await axios.get(url, {
        params: params,
        headers: {
            "Content-Type": "application/json"
        }
    });
}
    createCarousel() {
        for (let i=0; i<this.options.numberOfCarousels; i++) {
            let carouselContainer = this.createContainer(i)
            this.element.appendChild(carouselContainer)
        }
    }

// Faire une requête à l'API pour récupérer les données des films
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Récupérer le div du carousel
    const carouselDiv = document.getElementById('carousel');

    // Parcourir les données récupérées
    data.forEach(movie => {
      // Créer un élément de diapositive pour chaque film
      const slide = document.createElement('div');
      slide.classList.add('slide');
      slide.innerHTML = `<img src="${movie.cover}" alt="${movie.title}" data-id="${movie.id}">`;

      // Ajouter le diapositive au carousel
      carouselDiv.appendChild(slide);
    });

    // Récupérer les éléments du modal
    const modal = document.getElementById('modal');
    const modalCover = document.getElementById('modal-cover');
    const modalTitle = document.getElementById('modal-title');
    const modalGenres = document.getElementById('modal-genres');
    const modalDate = document.getElementById('modal-date');
    const modalRated = document.getElementById('modal-rated');
    const modalImdb = document.getElementById('modal-imdb');
    const modalDirectors = document.getElementById('modal-directors');
    const modalCast = document.getElementById('modal-cast');
    const modalDuration = document.getElementById('modal-duration');
    const modalCountry = document.getElementById('modal-country');
    const modalBoxOffice = document.getElementById('modal-box-office');
    const modalInfo = document.getElementById('modal-info');

    // Écouter les clics sur les images du carousel
    carouselDiv.addEventListener('click', event => {
      const target = event.target;
      if (target.tagName === 'IMG') {
        const movieId = target.getAttribute('data-id');
        const selectedMovie = data.find(movie => movie.id === movieId);
        // Mettre à jour le modal avec les détails du film sélectionné
        modalCover.src = selectedMovie.cover;
        modalTitle.textContent = selectedMovie.title;
        modalGenres.textContent = selectedMovie.genres.join(', ');
        modalDate.textContent = selectedMovie.release_date;
        modalRated.textContent = selectedMovie.rated;
        modalImdb.textContent = selectedMovie.imdb_score;
        modalDirectors.textContent = selectedMovie.directors.join(', ');
        modalCast.textContent = selectedMovie.cast.join(', ');
        modalDuration.textContent = selectedMovie.duration;
        modalCountry.textContent = selectedMovie.country;
        modalBoxOffice.textContent = selectedMovie.box_office;
        modalInfo.textContent = selectedMovie.summary;
        // Afficher le modal
        modal.style.display = 'block';
      }
    });

    // Fermer le modal lorsqu'on clique sur le bouton de fermeture
    const closeModal = document.querySelector('.close');
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données :', error);
  });


Assurez-vous de remplacer `"votre-url-de-l-api"` par l'URL de votre API et de personnaliser les éléments du modal en fonction de la structure des données fournies par votre API. De plus, vous devrez probablement styliser le carousel et le modal avec du CSS pour les rendre visuellement attrayants.
// close carousel
$('div#modal').on('click',function(event){
    event.preventDefault();
    $('div#modal').fadeOut('slow');
    $('h3,p,strong').removeClass('blured_text');
});

// modal
// Get the modal

// Get the button that opens the modal


// Get the <span> element that closes the modal


// When the user clicks on the button, open the modal


// When the user clicks on <span> (x), close the modal