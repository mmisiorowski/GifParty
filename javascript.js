//JS page that contains all our functions to pull data from the API with an AJAX call//

$("button").on("click", function() {

  var person = $(this).attr("data-person");
  //API key and Giffy URL, this links my JS to their library and gives the AJAX call something to pull up//
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10";
  //our AJAX call, this allows us to request information from the server referenced in the QueryURL//
  //Line which in this case would be Giphy, it allows us to make requests//
  //of the server without having to reload the page//
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      var results = response.data;
  
      for (var i = 0; i < results.length; i++) {
          if (results[i].rating !== "r" && results[i].rating !== "r") {
              var gifDiv = $("<div>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var personImage = $("<img>");
              personImage.attr("src", results[i].images.fixed_height.url);
              gifDiv.append(p);
                gifDiv.append(personImage);
                $("#gifs-appear-here").prepend(gifDiv);
          }
      }
    });
  });
  //  this section SHOULD handle our button functions, putting the keyword through the AJAX and obtaining the requested information from GIPHY servers. This is refrenced from activity 7 from week 3
  function renderButtons() {
  
      $("#gifdiv").empty();
  
      for (var i = 0; i < person.length; i++) {
  
        var a = $("<button>");
        a.addClass("gifDiv");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", person[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(person[i]);
        // Adding the button to the HTML
        $("#person-view").append(a);
      }
    }
  
    // This function handles events where one button is clicked
    $("#add-person").on("click", function(event) {
      // event.preventDefault() prevents the form from trying to submit itself.
      // We're using a form so that the user can hit enter instead of clicking the button if they want
      event.preventDefault();
  
      // This line will grab the text from the input box
      var movie = $("#person-input").val().trim();
      // The movie from the textbox is then added to our array
      person.push(person);
  
      // calling renderButtons which handles the processing of our movie array
      renderButtons();
    });
  
    // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();
  //Lines 68 - 80 contain the code and click functions that will change our gifs //
  //from the still to animate states when clicked//
    $(document).on("click", ".person-btn");
  
    renderButtons();
  
    $(".img").on("click", function() {
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("person", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("person", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });


