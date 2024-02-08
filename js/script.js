const API_URL = "http://localhost:8000/api/v1/titles/";
var total = 7
function fetchBestMovie(){
    const cover = document.getElementById('movie-cover');
    cover.style.display = 'block';
    let bestTitle = document.getElementByClassName("movie-cover")[0].getElementById("title")[0];
    let bestImg = document.getElementByClassName("img-cover")[0].getElementByTagName("img")[0];
    let bestDescription = document.getElementByClassName("movie-cover")[0];
    fetch(API_URL + "?sort_by=-imdb_score")
    .then(response=> response.json())
    .then(data =>{
    bestTitle.innerHTML = data["results"][0]["title"];
    bestImg.innerHTML = data["image_url"];
     })
    fetch(data["results"][0]["url"])
    .then((response)=> response.json())
    .then(data =>{bestDescription.innerHTML = data["description"];})
    })
    }
async function bestMovie(){
    let params = {sort_by:"-imdb_score"}
    let movie = (await getData(url, params)).data.results[0];

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

window.addEventListener('load',() =>{
fetchBestMovie()});
