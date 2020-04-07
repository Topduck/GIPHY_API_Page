var topics = ["ducks","hunting","beer"];


function renderButtons() {

        // Deleting the topics buttons prior to adding new topics buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each topics in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("topic");
          // Adding a data-attributes with a value of the topics at index i
          a.attr("id", topics[i]);
          // Providing the button's text with a value of the topics at index i
          a.text(topics[i]);
          // Adding the button to the HTML
          $("#buttons-view").append(a);
        }
      };


      
// on button click ajax call
function giphys(){
      $("button").on("click", function(){
        console.log("button clicked")
        $("#gifs").empty();
          // gathering the topic choosen by the user
          var topic = $(this).attr("id");
          // setting up the ajax call query with the api call including the topic
          var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=lmbtCljQZDKctPp9bxbGvx6n6Qe3hSfO&limit=4";

        $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){ 
          //Storing an array of response results from the API
          var results = response.data;
          console.log(results)
          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
                            // Creating a div for the gif
              var gifDiv = $("<div>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var topicImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              topicImage.attr("src", results[i].images.fixed_height_still.url);
              topicImage.attr("data-still", results[i].images.fixed_height_still.url);
              topicImage.attr("data-animate", results[i].images.fixed_height.url);
              topicImage.attr("data-state", "still");

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(topicImage);

              // Prepending the gifDiv to the "#gifs" div in the HTML
              $("#gifs").prepend(gifDiv);
            }
            stillAnimate()
      });
 });
};
function stillAnimate() {
  //turns still gifs to animated gifs.
  $("img").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
}
$("#add-topic").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var t = $("#topic-input").val().trim();

  // Adding topics from the textbox to our array
  topics.push(t);

  // Calling renderButtons which handles the processing of our topics array
  renderButtons();
  giphys()
});
renderButtons()
giphys()

