$(document).ready(function () {

    // psuedocode
    var ingredients = [];
    var storedIngredients = JSON.parse(localStorage.getItem("ingredients"));
    var missingCount
    var missingName = []
    var missingPrice = []
    var missingTotal
    function initIngredients() {
        if (storedIngredients != null) {
            ingredients = storedIngredients;
        } else if (storedIngredients === null) {
            
        };
    };
    // Create local storage to store our user's ingredient list
    $("#ing-button").on("click", function () {
        ingredients.push($("#ing-input").val());
        $("#ing-input").val("");
        localStorage.setItem("ingredients", JSON.stringify(ingredients));
        console.log(ingredients);
    });
    // create event listener for search button 

    // ajax API call for Spponacular API to populate recipe cards
    $("#recip-button").on("click", function () {
        var spoonURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredients + "&ranking=2&apiKey=83b505ff599e49239f3310bad1407b22";
        $.ajax({
            url: spoonURL,
            method: "GET"
        }).then(function (res) {
            console.log(res);

            // missingCount = res[3].missedIngredientCount
            // for (i = 0; i < missingCount; i++) {
            //     missingName.push(res[3].missedIngredients[i].name)
            // }
            
            for (i = 0; i < 5; i++) {
                var recipeCard = $("<div>")
                let recipeName = res[i].title;
                let recipeImgURL = res[i].image;
                var pName = $("<p>").text(recipeName)
                pName.attr("class", "title-text")
                recipeCard.attr("class", "box recipe-card")
                recipeCard.append(pName)
                
                var missingIngredientsArray1 = res[i].missedIngredients[0].name
                console.log(missingIngredientsArray1)

                $("#col-2").prepend(recipeCard)

            }
        });
    });

    $("#clear-results-button").on("click", function () {
        localStorage.setItem("ingredients", null)
        ingredients = []
        initIngredients()
        console.log(ingredients)
    })

    $(document).on("click", ".recipe-card", function() { 
        // generate list of ingredients still needed 

        // ajax API call for YouTube API to populate $("#video-thmb")
        let recipeName = $(this).text()
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search",
            method: "GET",
            data: {
                key: "AIzaSyBwUYS50KQBBjTpXf3LI20SO3rfcyQdYHE",
                q: recipeName,
                part: "snippet",
                type: "video"
            }
        }).then(function (response) {
            let vidTitle = response.items[0].snippet.title
            let vidTitleDiv = $("<h4>").text(vidTitle)
            let vidIcon = response.items[0].snippet.thumbnails.default.url
            let vidIconDiv = $("<img>").attr("src", vidIcon)
            $("#youtube-results").append(vidTitleDiv, vidIconDiv)

        })
    });
    initIngredients();
});