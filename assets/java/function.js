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
            console.log(response)
        });
    });

});

