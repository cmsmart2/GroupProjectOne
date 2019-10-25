//global Varibles
var arrayIng = [];
var arrayTag = [];
var allEquipment = [];
var extendedIng = [];
var allIngredient = [];
var ingredientAmounts = [];

//function that creates tags
function createTaggle() {
    $("#ingredients-here").empty();
    new Taggle('ingredients-here', {
        tags: arrayTag,
        onTagRemove: function (event, tag) {
            var ing = tag.split(' ').pop();
            var newArr = arrayIng.filter(function (el) {
                return el !== `+${ing}`
            })
            var newTag = arrayTag.filter(function (el) {
                return el !== `${tag}`
            })
            arrayIng = newArr;
            console.log(arrayIng);
            arrayTag = newTag;
            console.log(arrayTag);
        }
       
    });
    $('#ingredients-here')
    $(".taggle_placeholder").empty();
}
// Take value from inputs and look for recipe based on that value
$("#add-ingredient").on("click", function (event) {
    event.preventDefault();
    $("#my-form").addClass("was-validated");
    if (document.getElementById('my-form').checkValidity() === false) {
        return;
    }
    $("#my-form").removeClass("was-validated");
    var ingredient = $("#ingredient").val().trim();
    arrayIng.push("+" + ingredient);
    var amount = $("#amount").val();
    ingredientAmounts.push(amount);
    arrayTag.push(amount + " " + ingredient);
    createTaggle();
    $("#ingredient").val(" ");
    $("#amount").val(" ");
});
// Take the ingredients to find some recipes
$("#find-recipe").on("click", function (event) {
    event.preventDefault();
    // Tiur's API Key
    var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=e53c0977ab3a4a5b8872e1c7efb889ce&ingredients="+ arrayIng + "&number=5"
    // Cera's API Key
    // var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=bf050a8943b74210a77973e2062818b1&ingredients=" + arrayIng + "&number=5"
    // Zach's API Key
    // var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=75d00f17ac79400eaeb4e9097fdcbdc6&ingredients="+ arrayIng + "&number=5"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.length;
        //  recipe
        var clickHere = $("<div>");
        clickHere.addClass("detail py-2 text-center w-75 mx-auto");
        clickHere.css("background", "#fffffff0");
        clickHere.css("border", "1px solid grey");
        clickHere.text("Click The Image To See The Recipe");
        $(".recipe-show").append(clickHere);
        //carousel 
        var tagHere = $("<div>");
        tagHere.addClass("carousel slide");
        tagHere.attr("id", "together");
        tagHere.attr("data-ride", "carousel");
        $(".move").append(tagHere);
        var orderList = $("<ol>");
        orderList.addClass("carousel-indicators");
        var caInner = $("<div>");
        caInner.addClass("carousel-inner");
        tagHere.append(orderList, caInner);
        for (var j = 0; j < results; j++) {
            var list = $("<li>");
            list.attr("data-target", "#together");
            list.attr("data-slide-to", [j]);
            if (j === 0) {
                list.addClass("active");
            }
            orderList.append(list);
            // image and texts
            var ciDiv = $("<div>");
            ciDiv.addClass("carousel-item");
            if (j === 0) {
                ciDiv.addClass("active");
            }
            var recipePic = response[j].image;
            var recipeId = response[j].id;
            var recipeTitle = response[j].title
            var recipeImage = $("<img>");
            recipeImage.attr("src", recipePic);
            recipeImage.attr("data-id", recipeId);
            recipeImage.addClass("d-block w-75 mx-auto");
            var caption = $("<div>");
            caption.addClass("carousel-caption d-none d-md-block");
            caption.css("background", "#fffffff0")
            var h1 = $("<h1>");
            h1.text(recipeTitle);
            h1.addClass("lead");
            h1.addClass("text-body");
            caption.append(h1);
            ciDiv.append(recipeImage, caption);
            caInner.append(ciDiv);
        }
        // prev button
        var prev = $("<a>");
        prev.addClass("carousel-control-prev");
        prev.attr("href", "#together");
        prev.attr("role", "button");
        prev.attr("data-slide", "prev");
        tagHere.append(prev);
        var span1 = $("<span>");
        span1.addClass("carousel-control-prev-icon");
        span1.attr("aria-hidden", "true");
        var span2 = $("<span>");
        span2.addClass("sr-only");
        span2.text("Previous");
        prev.append(span1, span2);
        // next button
        var next = $("<a>");
        next.addClass("carousel-control-next");
        next.attr("href", "#together");
        next.attr("role", "button");
        next.attr("data-slide", "next");
        tagHere.append(next);
        var span3 = $("<span>");
        span3.addClass("carousel-control-next-icon");
        span3.attr("aria-hidden", "true");
        var span4 = $("<span>");
        span4.addClass("sr-only");
        span4.text("Next");
        next.append(span3, span4);
    });
    $(".move").empty();
    $(".recipe-show").empty();
});
// get the recipe based on which recipe we choose
$(document).on("click", ".d-block", function (event) {
    event.preventDefault();
    var recipeIdNum = $(this).attr("data-id");
    // Tiur's API Key
    var queryURL = "https://api.spoonacular.com/recipes/" +recipeIdNum + "/information?apiKey=e53c0977ab3a4a5b8872e1c7efb889ce"
    // Cera's API Key
    // var queryURL = "https://api.spoonacular.com/recipes/" + recipeIdNum + "/information?apiKey=bf050a8943b74210a77973e2062818b1"
    // Zach's API Key
    // var queryURL = "https://api.spoonacular.com/recipes/" +recipeIdNum + "/information?apiKey=75d00f17ac79400eaeb4e9097fdcbdc6"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".detail").remove();
        var recipeHere = $("<div>");
        recipeHere.addClass("container detail py-2 rounded");
        recipeHere.css("background", "#fffffff0");
        recipeHere.css("border", "1px solid grey");
        $(".recipe-show").append(recipeHere);
        // title
        var title = response.title;
        var p1 = $("<p>");
        p1.addClass("py-2 lead");
        p1.addClass("text-center")
        p1.text(title);
        recipeHere.append(p1);
        // loop through ingredients array
        var ifElse = response.analyzedInstructions.length;
        var extendedLength = response.extendedIngredients.length;
        for (var t = 0; t < extendedLength; t++) {
            extendedIng.push(response.extendedIngredients[t].name)
        }
        if (ifElse === 0) {
            var p3 = $("<p>");
            p3.addClass("pt-2");
            p3.text("Ingredients: " + extendedIng);
            recipeHere.append(p3);
        } else {
            // loop through equipment array
            var equipmentLength = response.analyzedInstructions[0].steps[0].equipment.length;
            var ingredientsLength = response.analyzedInstructions[0].steps[0].ingredients.length;
            for (var g = 0; g < ingredientsLength; g++) {
                allIngredient.push(response.analyzedInstructions[0].steps[0].ingredients[g].name);
            }
            for (var e = 0; e < equipmentLength; e++) {
                allEquipment.push(response.analyzedInstructions[0].steps[0].equipment[e].name);
            }
            if (equipmentLength === 0) {
                var p2 = $("<p>");
                p2.addClass("pt-2");
                p2.text("Ingredients: " + allIngredient + extendedIng);
                recipeHere.append(p2);
            } else {
                var p2 = $("<p>");
                p2.addClass("py-2");
                p2.text("Equipment: " + allEquipment);
                var p3 = $("<p>");
                p3.text("Ingredients: " + allIngredient + extendedIng);
                recipeHere.append(p2, p3);
            }
        }
        // cook's instructions 
        var instructions = response.instructions;
        var url = response.sourceUrl;
        if (instructions === null) {
            var p4 = $("<p>");
            p4.addClass("py-2");
            p4.text("Instructions: ");
            var a = $("<a>");
            a.attr("href", url);
            a.text(title);
            p4.append(a);
            recipeHere.append(p4);
        } else {
            var p4 = $("<p>");
            p4.addClass("py-2");
            p4.text("Instructions: " + instructions);
            // url
            var p5 = $("<p>");
            p5.addClass("pb-2");
            p5.text("More Information: ");
            var a = $("<a>");
            a.attr("href", url);
            a.text(title);
            p5.append(a);
            recipeHere.append(p4, p5);
        }
        var buttonDiv = $("<div>");
        recipeHere.append(buttonDiv);
        var newButton = $("<button>");
        newButton.addClass("reset my-3 mx-auto rounded border-secondary p-2");
        newButton.attr("type", "submit");
        newButton.text("Have Different Ingredients?");
        buttonDiv.append(newButton);
    });
    $(".detail").empty();
});
$(document).on("click", ".reset", function (event) {
    event.preventDefault();
    $(".move").empty();
    $(".recipe-show").empty();
    $("#ingredients-here").empty();
    $("#nutrition-here").empty();
    arrayIng = [];
    arrayTag = [];
    ingredientAmounts = [];
})
// get the value's nutrion
$("#find-nutrition").on("click", function (event) {
    $("#nutrition-here").empty();
    event.preventDefault();
    for (let n = 0; n < arrayIng.length; n++) {
        var findNutrition = "%20" + arrayIng[n] + "%20" + ingredientAmounts[n];
        var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=303b58c4&app_key=ef9d7b4d891b056959de013622064837&ingr=" + findNutrition;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var nutrition = response;
            var calories = nutrition.totalNutrientsKCal.ENERC_KCAL.quantity;
            var protein = nutrition.totalNutrientsKCal.PROCNT_KCAL.quantity;
            var carbohydrate = nutrition.totalNutrientsKCal.CHOCDF_KCAL.quantity;
            var fat = nutrition.totalNutrientsKCal.FAT_KCAL.quantity;
            $('#nutrition-here').append(`<p>${arrayTag[n]} </p>`);
            $('#nutrition-here').append(`<p>Total Cal Amount: ${calories}</p>`);
            $('#nutrition-here').append(`<p>Cal from Carbs: ${carbohydrate}</p>`);
            $('#nutrition-here').append(`<p>Cal from Protein: ${protein}</p>`);
            $('#nutrition-here').append(`<p>Cal from Fat: ${fat}</p>`);
        });
    };
}
);
