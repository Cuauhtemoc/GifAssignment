var topics = ["cute dogs", "cute cats", "cute puppies", "cute kittens"];
$(document).on("click","button", function(){
    var topic = $(this).attr("data-topic");
    var url = "https://api.giphy.com/v1/gifs/search?&q=" +
    topic + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response){
        var results = response.data;
        console.log(results);
        for (i = 0; i < results.length; i++)
        {
            var topicDiv = $("<div>");
            var p1 = $("<p>").text("Rating: " + results[i].rating);
            var p2 = $("<p>").text("Title: " + results[i].title);
            var topicImage = $("<img>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url);
            topicImage.attr("class", "gif");
            topicImage.attr("data-state", "still");
            topicDiv.append(topicImage);
            topicDiv.append(p2);
            topicDiv.append(p1);
            $("#gif-area").append(topicDiv);
        }
    });
});
$(document).on("click", ".gif", function(){
    var state = $(this).attr("data-state");
    if (state === "still")
    {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})
$("#add-gif").on("click", function(event){
    event.preventDefault();
   topics.push($("#new-gif").val());
   renderButtons(); 
})
function renderButtons(){
    $("#button-area").empty();
    for (i = 0; i < topics.length; i++){
        var btn = $("<button>");
        btn.attr("data-topic", topics[i])
        btn.text(topics[i]);
        $("#button-area").append(btn);
    }    
}
renderButtons();
