const API_URL = "http://localhost:8000/api/v1/titles/";
const TOP_URL = API_URL + "?format=json&sort_by=-imdb_score&genre"

function fetchBestMovie(TOP_URL){
    const cover = document.getElementById('movie-cover');
    cover.style.display = 'block';
    let bestTitle = document.getElementById("titlebestmovies");
    let bestImg = document.getElementById("best-movie-img");
    let bestDescription = document.getElementById("best-movie-description");
    fetch(TOP_URL)
    .then(response=> response.json())
    .then(data =>{
        bestTitle.innerHTML = data["results"][0]["title"];
        bestImg.src = data["results"][0]["image_url"];
        fetch(data["results"][0]["url"])
        .then((response)=> response.json())
        .then(data =>{
            bestDescription.innerHTML = data["description"]
        });
    });
}

function fetchCategories(){

// Création d'un élément div dynamique
    var nouvelElementDiv = document.createElement("div");

// Création d'un élément img
    var nouvelleImage = document.createElement("img");
    nouvelleImage.src = "chemin/vers/votre/image.jpg";

// Création d'un élément p pour le texte
    var nouveauTexte = document.createElement("p");
    nouveauTexte.textContent = "title";

// Ajout de l'image et du texte à l'élément div
    nouvelElementDiv.appendChild(nouvelleImage);
    nouvelElementDiv.appendChild(nouveauTexte);

// Sélection du div existant où vous souhaitez insérer le div dynamique
    var divExistant = document.getElementById("id-du-div-existant");
// Ajout du div dynamique au div existant
    divExistant.appendChild(nouvelElementDiv);


}
// page_size=7
// elements du DOM
// insertion dynamique dans div
const URL_API = "http://127.0.0.1:8000/api/v1/titles/?page_size=7&imdb_score_max=10&sort_by=-imdb_score&genre";
const desired_genres = ['Drama', 'Action', 'Thriller', 'Comedy', 'Horror', 'Mystery', 'History', "Sci-Fy", "Romance" ];

// Fonction pour récupérer les films depuis l'API et les peupler dans les carrousels
async function fetchAndPopulateMovies() {
    try {
        const response = await fetch(URL_API);
        const data = await response.json();

        // Filtrer les films par genre
        const filteredMoviesByGenre = desired_genres.map(genre => {
            return data.results.filter(movie => movie.genres.includes(genre));
        });

        // Peupler les carrousels avec les films de chaque catégorie
        filteredMoviesByGenre.forEach((movies, index) => {
            const categoryCarousel = document.querySelector(`.category${index + 1} .${desired_genres[index].toLowerCase()}-carousel`);

            movies.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie');
                movieElement.innerHTML = `
                    <img src="${movie.image_url}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                `;
                categoryCarousel.appendChild(movieElement);
            });
        });
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error);
    }
}

// Appeler la fonction pour récupérer et peupler les films
fetchAndPopulateMovies();

// Top rated by category



// button



// When the user clicks anywhere outside of the modal, close it

// fetch Top Rated Movies (number <=7)

// fetch Best Movies cat 1 (number <=7)
// fetch Best Movies cat 2 (number <=7)
// fetch Best Movies cat 3 (number <=7)

window.addEventListener('load',() =>{
    fetchBestMovie(TOP_URL);
    fetchCategories();
});
