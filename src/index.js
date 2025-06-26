import "./styles.css";
import noGIF from "./images/No-GIF.jpg";
import connectError from "./images/Connect-Error.jpg";

const img = document.querySelector('img');
const input = document.querySelector('input');
const searchBtn = document.querySelector('#searchBtn');
const catBtn = document.querySelector('#catBtn');
const myKey = "QpLVtnUCvKkMTkPJVPxYtd8RvZ0XXgmR";

catBtn.addEventListener('click', function showCatGIF(){
  fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${myKey}&s=cats`, {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      img.src = response.data.images.original.url;
      setTimeout(() => {alert('You successfully summon some cats!')}, 500);
    })
    .catch(error => {
      console.log(error);
    });
});