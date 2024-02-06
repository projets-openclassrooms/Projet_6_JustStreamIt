const api_url = "https://localhost:8000/api/v1/titles/";
    const response = await fetch(api_url + "?sort_by=-imdb_score");
    const data = await response.json();
async function fetchBestMovie(){
try{
    let bestImage = document.getElementById("best-cover-img");
    bestImage.src = data.results[0].image_url;




}
}
// move carousel to right


// move carousel to left

// display carousel

// close carousel

// Top rated cover

// button
// modal
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var button = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
button.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// fetch Top Rated Movies (number <=7)

// fetch Best Movies cat 1 (number <=7)
// fetch Best Movies cat 2 (number <=7)
// fetch Best Movies cat 3 (number <=7)