const API_URL = "http://localhost:8000/api/v1/titles/?format=json&sort_by=-imdb_score&genre&page_size=1&imdb_score_max=10";

// pour afficher la description uniquement dans la fenetre bestmovies

function fetchBestMovie(TOP_URL){
    let bestDescription = document.getElementById("best-movie-description");
    fetch(TOP_URL)
    .then(response=> response.json())
    .then(data =>{
        fetch(data["results"][0]["url"])
        .then((response)=> response.json())
        .then(data =>{
            bestDescription.innerHTML = data["description"]
        });
    });
};

document.addEventListener('DOMContentLoaded', function(){
    fetchBestMovie(API_URL);

});