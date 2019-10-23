var arrayIng = [];
var ingredientNames = [];
var ingredientAmounts = [];
var ingredientCalories = [];

$.getScript("./assets/java/taggle.js", function () {
    var taggle = new Taggle('ingreditients-here');
    taggle.add(arrayIng)

});
// Take value from inputs and look for recipe based on that value
$("#add-ingredient").on("click", function (event) {
    event.preventDefault();
    var ingredient = $("#ingredient").val().trim();
    arrayIng.push("+" + ingredient);
    ingredientNames.push(ingredient);
    var amount = $("#amount").val();
    ingredientAmounts.push(amount);
    var list = $("<li>");
    list.addClass("find");
    list.attr("data-ingredient", ingredient);
    list.attr("data-amount", amount);
    list.text(ingredient + " " + amount);
    $("#ingredients-here").append(list);
    $("#ingredient").val(" ");
    $("#amount").val(" ");
});
// Take the ingredients to find some recipes
$("#find-recipe").on("click", function (event) {
    event.preventDefault();
    var findIngredients = $(".find").attr("data-ingredient");
    console.log(findIngredients);
    // Tiur's API Key
    // var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=e53c0977ab3a4a5b8872e1c7efb889ce&ingredients="+ findIngredients + "&number=10"
    // Cera's API Key
    var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=bf050a8943b74210a77973e2062818b1&ingredients=" + arrayIng + "&number=12"
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.length;
        console.log(results);
        for (var i = 0; i < results; i++) {
            var recipePic = response[i].image;
            var recipeId = response[i].id;
            var recipeDiv = $("<div>");
            recipeDiv.addClass("card recipe-card");
            recipeDiv.addClass("col-lg-3");
            recipeDiv.css("max-width", "350px");
            var recipeImage = $("<img>");
            recipeImage.attr("src", recipePic);
            recipeImage.attr("data-id", recipeId);
            recipeImage.addClass("card-img-top");
            recipeImage.addClass("mx-auto");
            recipeImage.css("max-width", "300px");
            var p = $("<p>").text(response[i].title);
            p.addClass("card-text");
            p.addClass("text-center");
            recipeDiv.append(recipeImage, p);
            $("#recipe-here").append(recipeDiv);
        }
    });
    $("#recipe-here").empty();
});
// get the recipe based on which recipe we choose
$(document).on("click", ".card-img-top", function (event) {
    event.preventDefault();
    var recipeIdNum = $(this).attr("data-id");
    console.log(recipeIdNum);
    // Tiur's API Key
    // var queryURL = "https://api.spoonacular.com/recipes/" +recipeIdNum + "/information?apiKey=e53c0977ab3a4a5b8872e1c7efb889ce"
    // Cera's API Key
    var queryURL = "https://api.spoonacular.com/recipes/" + recipeIdNum + "/information?apiKey=bf050a8943b74210a77973e2062818b1"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.title);
        console.log(response.instructions);
        console.log(response.analyzedInstructions[0].steps[0].ingredients);
        // var stepsLength = response.analyzedInstructions[0].steps;
        // for( var j = 0; j < stepsLength; j++){
        //     console.log(response.analyzedInstructions[0].steps[j].step);
        // }

        // loop through equipment array
        // var equipmentLength = [0].equipment; 
        // for(var e = 0; e < equipmentLength; e++){
        //     console.log(response.analyzedInstructions.steps[0].equipment[e].name);
        // }
        // loop through ingredients array
        // var ingredientsLength = response.analyzedInstructions[0].steps[0].ingredients;
        // for(var g = 0; g <ingredientsLength; g++){
        //     console.log(response.analyzedInstructions[0].steps[0].ingredients[j].name);
        // }
    });
});

// get the value's nutrion
$("#find-nutrition").on("click", function (event) {
    event.preventDefault();
    for (let n = 0; n < arrayIng.length; n++) {
        var findNutrition = "%20" + ingredientNames[n] + "%20" + ingredientAmounts[n];
        var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=303b58c4&app_key=ef9d7b4d891b056959de013622064837&ingr=" + findNutrition;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            ingredientCalories.push(response);
            console.log(response)
            // console.log(response.calories);
            var nutrition = response;
            var calories = nutrition.calories;
            var protein = nutrition.totalNutrients.PROCNT.quantity;
            var calcium = nutrition.totalDaily.CA;
            var carbohydrate = nutrition.totalNutrientsKCal.CHOCDF_KCAL.quantity;
            var fat = nutrition.totalNutrientsKCal.FAT_KCAL.quantity;
            var cholesterol = nutrition.totalNutrients.CHOLE.quantity;
            var satFat = nutrition.totalNutrients.FASAT.quantity;

            $('#nutrition-here').append(`<p>${ingredientNames[n]} Total Cal Amount: ${calories}</p>`);
            $('#nutrition-here').append(`<p>${ingredientNames[n]} Cal from Carbs: ${carbohydrate}</p>`);
            $('#nutrition-here').append(`<p>${ingredientNames[n]} Cal from Fat: ${fat}</p>`);
            $('#nutrition-here').append(`<p>${ingredientNames[n]} Cal from Saturated Fat: ${satFat}</p>`);
            $('#nutrition-here').append(`<p>${ingredientNames[n]} Total Cholesterol: ${cholesterol}</p>`);

            // for (var n = 0; n < nutrition; n++) {
            // calories = response[n].calories;

            // }
            console.log(calories, calcium, carbohydrate);
        });

    }


    // var findIngredient = $(".find").attr("data-ingredient");
    // var findAmount = $(".find").attr("data-amount");
    // var findNutrition = "%20" + findIngredient + "%20" + findAmount;
    // var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=303b58c4&app_key=ef9d7b4d891b056959de013622064837&ingr=" + findNutrition;
    // console.log(queryURL);

    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function (response) {
    //     ingredientCalories.push("+" + response);
    //     console.log(response)
    //     // console.log(response.calories);
    //     var nutrition = response;
    //     var calories = nutrition.calories;
    //     var calcium = nutrition.totalDaily.CA;
    //     $('p').text("Calories:" + calories).appendTo("#nutrition-here");

    //     // for (var n = 0; n < nutrition; n++) {
    //     // calories = response[n].calories;

    //     // }
    //     console.log(calories, calcium);
    // });
    // console.log(ingredientNames);
}); 
