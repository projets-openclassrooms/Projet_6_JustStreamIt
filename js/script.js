const API_URL = "http://localhost:8000/api/v1/titles/";
const TOP_URL = API_URL + "?format=json&sort_by=-imdb_score&genre"
const URL_CATEGORIES = TOP_URL + "&page_size=7&imdb_score_max=10";
const desired_genres = ['Sci-Fi', 'Comedy','Romance', 'Thriller',  'Horror', 'Mystery', 'History','Drama', 'Action' ];

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


// page_size=7
// elements du DOM
// insertion dynamique dans div

// Fonction pour récupérer les films depuis l'API et les peupler dans les carrousels
async function fetchAndPopulateMovies() {
    try {
        const response = await fetch(URL_CATEGORIES);
        const data = await response.json();

        // Filtrer les films par genre
        const filteredMoviesByGenre = desired_genres.map(genre => {
            return data.results.filter(movie => movie.genres.includes(genre));
        });
        console.log(filteredMoviesByGenre);
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
      console.error(error);
      }
}


// button



// When the user clicks anywhere outside of the modal, close it

// fetch Top Rated Movies (number <=7)

// fetch Best Movies cat 1 (number <=7)
// fetch Best Movies cat 2 (number <=7)
// fetch Best Movies cat 3 (number <=7)

window.addEventListener('load',() =>{
    fetchBestMovie(TOP_URL);
    fetchAndPopulateMovies();
});
