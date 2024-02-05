const api_url = "http://localhost:8000/api/v1/titles/";
const
async function fetchHighestRatedMovie() {
    return fetch(api_url + "?sort_by=-imdb_score")
    .then(response=>response.json())
    .then(data => {
        const movie = data.results[0];
        const title = movie.title;
        const imageUrl = movie.image_url;

        return movie;})



}

async function fetchBestMovie() {
  console.log('calling');
  const response = await fetch(api_url + "?sort_by=-imdb_score");
  const data = await response.json();
  const result = await resolveAfter2Seconds();
  console.log(result);
  // Expected output: "resolved"
}
fetchHighestRatedMovie()
fetchBestMovie();

// move carousel to right


// move carousel to left

// display carousel

// close carousel

// Top rated cover

// button

// fetch Top Rated Movies (number <=7)

// fetch Best Movies cat 1 (number <=7)
// fetch Best Movies cat 2 (number <=7)
// fetch Best Movies cat 3 (number <=7)