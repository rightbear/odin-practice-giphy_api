import "./styles.css";
import noGIF from "./images/No-GIF.jpg";
import connectError from "./images/Connect-Error.jpg";

const img = document.querySelector("img");
const input = document.querySelector("input");
const searchBtn = document.querySelector("#searchBtn");
const catBtn = document.querySelector("#catBtn");
const myKey = "QpLVtnUCvKkMTkPJVPxYtd8RvZ0XXgmR";

const catEmoji = "\u{1F431}";
const wrySmileEmoji = "\u{1F605}";
const confuseEmoji = "\u{1F914}";
const goodSmileEmoji = "\u{1F604}";
const pensiveEmoji = "\u{1F614}";

// Show the requested GIF with input keywords
searchBtn.addEventListener("click", function showNewGIF() {
  // Check whether the input keyword exists when searching
  if (input.value === "") {
    alert(
      `It seems that you don't type anything when searching. ${wrySmileEmoji}`,
    );
  } else {
    const inputKeyword = input.value;
    const searchParams = new URLSearchParams();
    searchParams.append("api_key", `${myKey}`);
    searchParams.append("s", `${inputKeyword}`);

    fetch(`https://api.giphy.com/v1/gifs/translate?${searchParams}`, {
      mode: "cors",
    })
      .then(function (response) {
        // Check whether the connection to the GIF website is successful
        if (!response.ok) {
          // response.ok is true when status code is 200~299
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(function (response) {
        // Check whether there is corresponding GIF to the input keyword.
        // If the keyword has no corresponding GIF, the website still returns status code 200
        // But the length of data array in response json file will be 0, we can show some result based on it
        if (response.data.length === 0) {
          img.src = noGIF;
          setTimeout(() => {
            alert(
              `No result for the input keyword. Maybe change a new keyword? ${confuseEmoji}`,
            );
          }, 1000);
        }
        // If the keyword has corresponding GIFs, show the returned result.
        else {
          img.src = response.data.images.original.url;
          setTimeout(() => {
            alert(`Here is the GIF you want. Enjoy it! ${goodSmileEmoji}`);
          }, 2000);
        }
      })
      .catch((error) => {
        // If there is some error thrown out when requesting the GIF, show the error message
        img.src = connectError;
        console.log(error);
        setTimeout(() => {
          alert(
            `Oops! There is some trouble here. Please try to search later. ${pensiveEmoji}`,
          );
        }, 1000);
      });
  }
});

// Show the requested GIF about cats
catBtn.addEventListener("click", function showCatGIF() {
  fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${myKey}&s=cats`, {
    mode: "cors",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      img.src = response.data.images.original.url;
      setTimeout(() => {
        alert(`You successfully summon some cute little things! ${catEmoji}`);
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
    });
});
