var movies = [];     
var favorites = []; 

var grid = document.getElementById("movie-grid");
var countText = document.getElementById("count");
var message = document.getElementById("message");
var clearButton = document.getElementById("clear-btn");

function loadFavorites() {
  var saved = localStorage.getItem("favoriteMovies");


  if (saved === null) {
    return [];
  }

  return JSON.parse(saved);
}

function saveFavorites() {
  localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
}

function showMovies() {
  grid.innerHTML = "";

  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i];

    var card = document.createElement("div");
    card.className = "card";

   
    var isFavorite = favorites.includes(movie.title);
    var star = "☆";
    if (isFavorite) {
      card.className = "card favorited";
      star = "★";
    }

    card.innerHTML =
      '<img class="poster" src="' + movie.poster + '" alt="' + movie.title + ' poster">' +
      "<h2>" + movie.title + "</h2>" +
      '<p class="meta">' + movie.year + " | " + movie.genre + "</p>" +
      '<button class="star-btn" data-title="' + movie.title + '">' + star + "</button>";

    grid.appendChild(card);
  }

  var buttons = document.querySelectorAll(".star-btn");
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].addEventListener("click", function () {
      toggleFavorite(this.dataset.title);
    });
  }

  countText.textContent = favorites.length + " of " + movies.length + " movies favorited";
}

function toggleFavorite(title) {
  var index = favorites.indexOf(title);

  if (index === -1) {
  } else {
    favorites.splice(index, 1);  
  }

  saveFavorites();
  showMovies();
}

clearButton.addEventListener("click", function () {
  favorites = [];
  localStorage.removeItem("favoriteMovies");
  showMovies();
});

favorites = loadFavorites();

fetch("favorites-movies.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    movies = data;
    showMovies();
  })
  .catch(function (error) {
    message.hidden = false;
    message.textContent = "Could not load the movies. Try opening the page with a local server (like Live Server).";
    console.log(error);
  });