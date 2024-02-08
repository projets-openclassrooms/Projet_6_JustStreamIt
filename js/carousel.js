const API_URL = "http://localhost:8000/api/v1/titles/";
const axios = require('axios');

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