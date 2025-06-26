import "./styles.css";

const img = document.querySelector('img');
fetch('https://api.giphy.com/v1/gifs/translate?api_key=QpLVtnUCvKkMTkPJVPxYtd8RvZ0XXgmR&s=cats', {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      img.src = response.data.images.original.url;
    })
    .catch(error => {
      console.log(error);
    });