(function(){
  'use strict';

  var STAR_EMOJI = '⭐';
  var CHECK_EMOJI = '✅';

  var appendMovie = function(ul, result) {
    var node = document.createElement('li');

    var detailsLink = createDetailsLink(result);
    var favoriteLink = createFavoriteLink(result);

    node.appendChild(detailsLink);
    node.appendChild(favoriteLink);

    ul.appendChild(node);
  };

  var createDetailsLink = function(result) {
    var detailsLink = document.createElement('span');
    detailsLink.classList.add('clickable');
    detailsLink.classList.add('link');
    detailsLink.innerText = result.Title;

    detailsLink.addEventListener('click', function() {
      showDetails(result);
      return false;
    });

    return detailsLink;
  };

  var createFavoriteLink = function(result) {
    var favoriteLink = document.createElement('span');
    favoriteLink.classList.add('clickable');
    favoriteLink.innerText = STAR_EMOJI;

    var favoriteListener = function() {
      addFavorite(result);
      this.innerText = CHECK_EMOJI;

      // deactivte the current listener
      this.removeEventListener('click', favoriteListener, false);

      return false;
    };

    favoriteLink.addEventListener('click', favoriteListener);

    return favoriteLink;
  };

  var addFavorite = function(result) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/favorites', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var data = "name=" + encodeURI(result.Title) + "&oid=" + result.imdbID;
    xhr.send(data);
  };

  var showDetails = function(result) {
    var detailsElement = document.querySelector("#movie-details");

    while (detailsElement.hasChildNodes()) {
      detailsElement.removeChild(detailsElement.lastChild);
    }

    for (var key in result) {
      var term = document.createElement('dt');
      term.innerText = key;
      var definition = document.createElement('dd');
      definition.innerText = result[key];

      detailsElement.appendChild(term);
      detailsElement.appendChild(definition);
    }
  };

  document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();
    var input = document.querySelector('input').value;
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'http://omdbapi.com/?s=' + encodeURIComponent(input), true);
    xhr.addEventListener('load', function(response){
      var results = JSON.parse(this.response).Search;
      var ul = document.querySelector('#movie-list')
      for(var i = 0; i < results.length; i++){
        appendMovie(ul, results[i]);
      }
    });

    xhr.send();
  });
})();
