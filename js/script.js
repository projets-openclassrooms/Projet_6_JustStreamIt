const API_URL = "http://localhost:8000/api/v1/titles/?format=json&sort_by=-imdb_score&genre&page_size=8&imdb_score_max=10";
const desired_genres = ['Drama' ];

function fetchBestMovie(TOP_URL){
    const cover = document.getElementById('movie-cover');
    cover.style.display = 'block';
    let bestTitle = document.getElementById("best-movie-title");
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
};

document.addEventListener('DOMContentLoaded', function(){
    fetchBestMovie(API_URL);

});
