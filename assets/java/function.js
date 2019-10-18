// Take value from inputs

$("#add-ingreditien").on("click", function(event){
    event.preventDefault();
    var ingreditien = $("#ingreditien").val();
    var amount = $("#amount").val();
    var list = $("<li>");
    list.addClass("find");
    list.attr("data-ingreditien", ingreditien);
    list.attr("data-amount", amount);
    list.text(ingreditien+" "+amount);
    $("#ingreditients-here").append(list);
    $("#ingreditien").val(" ");
    $("#amount").val(" ");

    // Take the ingreditiens to find some recipes
    $("#find-recipe").on("click", function(event){
        event.preventDefault();
        var findIngredients = $(".find").attr("data-ingreditien");
        console.log(findIngredients);
        var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=e53c0977ab3a4a5b8872e1c7efb889ce&ingredients="+ findIngredients + "&number=10"
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }) .then(function(response){
            console.log(response);
            var results = response.length;
            console.log(results);
        for (var i = 0; i < results; i++) {
            var recipeDiv = $("<div>");
            var p = $("<p>").text(response[i].title);
            var recipeImage = $("<img>");
            var recipePic = response[i].image;
            var recipeId = response[i].id;
            recipeImage.attr("src", recipePic);
            recipeImage.attr("data-id", recipeId);
            recipeImage.addClass("card-img-top");
            recipeImage.css("max-width", "400px");
            p.addClass("card-text");
            recipeDiv.append(p);
            recipeDiv.append(recipeImage);
            recipeDiv.addClass("card recipe-card");
            $("#recipe-here").prepend(recipeDiv);
        }
        });
    });

});
$(document).on("click", ".card-img-top", function(event){
    event.preventDefault();
        var recipeIdNum = $(this).attr("data-id");
        console.log(recipeIdNum);
        var queryURL = "https://api.spoonacular.com/recipes/" +recipeIdNum + "/information?apiKey=e53c0977ab3a4a5b8872e1c7efb889ce"
        $.ajax({
            url: queryURL,
            method: "GET"
        }) .then(function(response){
            console.log(response);
        });

});

