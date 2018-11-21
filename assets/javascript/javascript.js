$(document).ready(function() {
  
  var topics = [];

     function displayGIFS() {
  
    var x = $(this).data("search");
    console.log(x);
  
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";
  
    console.log(queryURL);
  
    $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
            
            var topicDiv = $("<div class='col-md-4'>");
  
            var rating = results[i].rating;
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
            var image = $("<img>");
            var p = $("<p>").text("Rating: " + rating);
  
            image.attr("src", still);
            image.addClass("Giphy");
            image.attr("data-state", "still");
            image.attr("data-still", still);
            image.attr("data-animate", animated);
            topicDiv.append(p);
            topicDiv.append(image);
            $("#dropdown").prepend(topicDiv);
  
          }
    });
  }
  
    
    $("#addTopic").on("click", function(event) {
          event.preventDefault();
          var newSearch = $("#Input").val().trim();
          topics.push(newSearch);
          console.log(topics);
          $("#Input").val('');
          displayButtons();
        });
  
    
    function displayButtons() {
      $("#gifButton").empty();
      for (var i = 0; i < topics.length; i++) {
        var a = $('<button class="btn btn-light">');
        a.attr("id", "topic");
        a.attr("data-search", topics[i]);
        a.text(topics[i]);
        $("#myButtons").append(a);
      }
    }

    displayButtons();
  
    
    $(document).on("click", "#topic", displayGIFS);
  
    
    $(document).on("click", ".Giphy", pausePlayGifs);
  
    
    function pausePlayGifs() {
       var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
    }
  }
  
  });