// psuedocode
var ingredients = []
// Create local storage to store our user's ingredient list
$("#ing-button").on("click", function() {
    ingredients.push($("#ing-input").val())
    $("#ing-input").val("")
    localStorage.setItem("ingredients", JSON.stringify(ingredients))
    console.log(ingredients)
})
// create event listener for search button 

// ajax API call for Spponacular API to populate recipe cards
$("#recip-button").on("click", function () {
    var spoonURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + ingredients + "&apiKey=83b505ff599e49239f3310bad1407b22";
    $.ajax({
        url: spoonURL,
        method: "GET"
    }).then(function(res) {
        console.log(res)
    })
})

// create event listener for recipe cards

// ajax API call for YouTube API to populate YouTube return box

// generate list of ingredients still needed