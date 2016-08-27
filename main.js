$(document).ready(function(){

  var q = {
    url: 'http://api.themoviedb.org/3/',
    poster: 'http://image.tmdb.org/t/p/w400_and_h600_bestv2',
    landscape: 'http://image.tmdb.org/t/p/original',
    mode: 'search/movie',
    query: '?query=',
    key: '&api_key=a00b1e93ae8d3a423385de614ad8cf5b'
  };

  $('#form').on('submit', function (event) {
    event.preventDefault();
    var input = $('#term').val();
    $.ajax(q.url + q.mode + q.query + input + q.key, {
      success: function (result) {
        $('#poster').html('');
        $('#header').html('<h1>' + result.results[0].title + '</h1>' + '<h2>(' + result.results[0].release_date.substring(0,4) + ')</h2>');
        $('#overview').html('<p>' + result.results[0].overview + '</p>');
        $('<img>').attr('id', 'main').attr('src', q.poster + result.results[0].poster_path).appendTo('#poster');

        $.getJSON(q.url + 'movie/' + result.results[0].id + '/images?' + q.key, function (result) {
          $('#images').html('');
          for (var i = 1; i < 7; i++) {
          $('<img>').attr('id', 'landscape').attr('src', q.landscape + result.backdrops[i].file_path).appendTo('#images');
          $('.bg').css('background-image', 'url(' + q.landscape + result.backdrops[0].file_path + ')');
          }
        });  // end images getJSON
      }, // end success
      error: function (request, errorType, errorMessage) {
        alert('Error: ' + errorType + ', ' + errorMessage + ' :(');
      },
      timeout: 3000,
      beforeSend: function () {
        $('#search').attr('value', 'loading...');
      },
      complete: function () {
        $('#search').attr('value', 'Go!');
      }
    });  // end poster getJSON
  }); // end submit event


}); // end document ready
