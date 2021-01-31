$(document).ready(function () {

    // psuedocode
    var ingredients = [];
    var storedIngredients = JSON.parse(localStorage.getItem("ingredients"));
    var missingCount
    var missingName = []
    var missingPrice = []
    var missingTotal
    function initIngredients() {
        storedIngredients = JSON.parse(localStorage.getItem("ingredients"));
        if (storedIngredients != null) {
            ingredients = storedIngredients;
            writeIngredients()
        } else if (storedIngredients === null) {

        };
    };

    function writeIngredients() {
        $("#ing-here").text("")
        for (i = 0; i < ingredients.length; i++) {
            var ingHere = $("#ing-here")
            var ingDiv = $("<div>")
            var ingCard = $("<p>").text(ingredients[i])
            ingCard.attr("class", "box ing-card")
            ingDiv.append(ingCard)
            ingHere.prepend(ingDiv)
        }
    }
    // Create local storage to store our user's ingredient list
    $("#ing-button").on("click", function () {
        if ($("#ing-input").val() != "") {
            ingredients.push($("#ing-input").val());
            $("#ing-input").val("");
            localStorage.setItem("ingredients", JSON.stringify(ingredients));
            writeIngredients()
        } else if ($("#ing-input").val() === "") {
            alert("woah")
        }

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

            for (i = 0; i < 5; i++) {
                var recipeCard = $("<div>")
                let recipeName = res[i].title;
                let recipeImgURL = res[i].image;
                var pName = $("<p>").text(recipeName)
                pName.attr("class", "title-text")
                recipeCard.attr("class", "box recipe-card")
                recipeCard.attr("id", i)
                recipeCard.append(pName)




                $("#col-2").prepend(recipeCard)

            }
            $(document).on("click", ".recipe-card", function () {
                var recipeNumb = $(this).attr("id")
                var missedList = []
                for (i = 0; i < res[recipeNumb].missedIngredients.length; i++) {
                    missedList.push(res[recipeNumb].missedIngredients[i].name)
                }
                console.log(missedList)
            })
        });
    });

    $("#clear-results-button").on("click", function () {
        localStorage.removeItem("ingredients")
        ingredients = []
        $("#ing-here").text("")
        initIngredients()
        console.log(ingredients)
    })

    $(document).on("click", ".recipe-card", function () {
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