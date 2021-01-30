$(document).ready(function() {

// // psuedocode
// var ingredients = []
// // Create local storage to store our user's ingredient list
// $("#ing-button").on("click", function() {
//     ingredients.push($("#ing-input").val())
//     $("#ing-input").val("")
//     localStorage.setItem("ingredients", JSON.stringify(ingredients))
//     console.log(ingredients)
// })
// // create event listener for search button 

// // ajax API call for Spponacular API to populate recipe cards
// $("#recip-button").on("click", function () {
//     var spoonURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + ingredients + "&apiKey=83b505ff599e49239f3310bad1407b22";
//     $.ajax({
//         url: spoonURL,
//         method: "GET"
//     }).then(function(res) {
//         console.log(res)
//     })
// })

// create event listener for recipe cards

// $("#col-2").on("click", function(){ // this event listener will actually need to be on the div id for each recipe card, which is appended by the spooancular API section
    
    // generate list of ingredients still needed 

    // ajax API call for YouTube API to populate $("#video-thmb")
    let recipeTitle = "pasta"
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search",
        method: "GET",
        data: {
            key: "AIzaSyBwUYS50KQBBjTpXf3LI20SO3rfcyQdYHE",
            q: recipeTitle,
            part: "snippet",
            type: "video"
        }
    }).then(function(response){
        console.log(response)
        console.log(response.items[0].snippet.title)
        console.log(response.items[0].snippet.thumbnails.default.url)
    })
// });

});