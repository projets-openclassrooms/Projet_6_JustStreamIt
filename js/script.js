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
    nouveauTexte.textContent = "Votre texte ici";

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

// Top rated by category



// button



// When the user clicks anywhere outside of the modal, close it

// fetch Top Rated Movies (number <=7)

// fetch Best Movies cat 1 (number <=7)
// fetch Best Movies cat 2 (number <=7)
// fetch Best Movies cat 3 (number <=7)

window.addEventListener('load',() =>{
    fetchBestMovie(TOP_URL);
});
