// Take value from inputs

$("#add-ingreditien").on("click", function(event){
    event.preventDefault();
    var ingreditien = $("#ingreditien").val();
    var amount = $("#amount").val();
    var list = $("<li>");
    list.text(ingreditien+" "+amount);
    $("#ingreditients-here").append(list);
    $("#ingreditien").val(" ");
    $("#amount").val(" ");

    // Take the ingreditiens to find some recipes
$("#find-recipe").on("click", function(event){
    event.preventDefault();
    alert("CLICKED");
    var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=e53c0977ab3a4a5b8872e1c7efb889ce&ingredients=apples,+flour,+sugar&number=2"

});
});

