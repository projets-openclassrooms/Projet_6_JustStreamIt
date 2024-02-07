const API_URL = "http://localhost:8000/api/v1/titles/";
async function loadNames(){const response = await fetch(API_URL); const names = await response.json(); console.log(names);}

loadNames();
function fetchBestMovie(){
    const cover = document.getElementById('movie-cover');
    cover.style.display = 'block';
    let bestTitle = document.getElementByClassName("movie-cover")[0].getElementById("title")[0];
    let bestDescription = document.document.getElementByClassName("movie-cover");
    fetch(API_URL + "?sort_by=-imdb_score")
    .then((response)=> response.json())
    .then((data) =>{
    bestTitle.innerHTML = data["title"];
    bestDescription.innerHTML = data["description"]; })
    .catch(function(error){
    cover.style.display = 'none';
    console.log("Erreur dans la restitution", error);
    })
    ;
    }

// close carousel
$('div#modal').on('click',function(event){
    event.preventDefault();
    $('div#modal').fadeOut('slow');
    $('h3,p,strong').removeClass('blured_text');
});
// Top rated cover

// button
// modal
// Get the modal

// Get the button that opens the modal


// Get the <span> element that closes the modal


// When the user clicks on the button, open the modal


// When the user clicks on <span> (x), close the modal


// When the user clicks anywhere outside of the modal, close it

// fetch Top Rated Movies (number <=7)

// fetch Best Movies cat 1 (number <=7)
// fetch Best Movies cat 2 (number <=7)
// fetch Best Movies cat 3 (number <=7)
function main(){
window.addEventListener('load',() =>{
fetchBestMovie()});
}