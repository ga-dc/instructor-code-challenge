(function(){
  var appendMovie = function(ul, result) {
    var node = document.createElement('li');
    var link = document.createElement('span');
    link.classList.add('clickable');

    link.addEventListener('click', function() {
      showDetails();
      return false;
    });

    link.innerText = result.Title;
    node.appendChild(link);
    ul.appendChild(node);
  };

  var showDetails = function() {
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
