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
            var recipePic = response[i].image;
            var recipeId = response[i].id;
            var recipeDiv = $("<div>");
            recipeDiv.addClass("card recipe-card");
            recipeDiv.addClass("my-3");
            recipeDiv.css("max-width", "350px");
            var recipeImage = $("<img>");
            recipeImage.attr("src", recipePic);
            recipeImage.attr("data-id", recipeId);
            recipeImage.addClass("card-img-top");
            recipeImage.addClass("mx-auto");
            recipeImage.css("max-width", "300px");
            var p = $("<p>").text(response[i].title);
            p.addClass("card-text");
            p.addClass("mx-auto");
            recipeDiv.append(recipeImage, p);
            $("#recipe-here").append(recipeDiv);
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

$("#find-nutrition").on("click", function (event) {
    event.preventDefault();
    var findIngredient = $(".find").attr("data-ingreditien");
    var findAmount = $(".find").attr("data-amount");
    var findNutrition = findIngredient + findAmount;
    var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=303b58c4&app_key=ef9d7b4d891b056959de013622064837&ingr=" + findNutrition;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        console.log(response.calories);
    });
}); 
