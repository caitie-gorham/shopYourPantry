$(document).ready(function () {

    // psuedocode
    var ingredients = [];
    var storedIngredients = JSON.parse(localStorage.getItem("ingredients"));
    var missedList = []
    function initIngredients() {
        storedIngredients = JSON.parse(localStorage.getItem("ingredients"));
        if (storedIngredients != null) {
            ingredients = storedIngredients;
            writeIngredients()
        } else if (storedIngredients === null) {

        };
    };

    function clearCol3() {
        $("#recip-ing").text("")
        $("#youtube-results").text("")
    }

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
        $("#col-2").attr("class", "column")
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
                recipeCard.append($("<img>").attr("src", recipeImgURL))




                $("#col-2").prepend(recipeCard)

            }
            $(document).on("click", ".recipe-card", function () {
                var recipeNumb = $(this).attr("id")
                for (i = 0; i < res[recipeNumb].missedIngredients.length; i++) {
                    missedList.push(res[recipeNumb].missedIngredients[i])
                }
                for (i = 0; i < missedList.length; i++) {
                    var missedID = missedList[i].id
                    var missedAmount = missedList[i].amount
                    var missedUnit = missedList[i].unit
                    var priceURL = "https://api.spoonacular.com/food/ingredients/" + missedID + "/information?amount=" + missedAmount + "&unit=" + missedUnit + "&apiKey=83b505ff599e49239f3310bad1407b22";
                    $.ajax({
                        url: priceURL,
                        method: "GET"
                    }).then(function (res) {
                        var recipIng = $("#recip-ing")
                        var missedDiv = $("<div>")
                        var missedCard = $("<p>").text(res.originalName + " $" + ((res.estimatedCost.value) / 100).toFixed(2))
                        missedCard.attr("class", "box missed-card")
                        missedDiv.append(missedCard)
                        recipIng.prepend(missedDiv)
                    })
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
        clearCol3()
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
            let vidID = response.items[0].id.videoId
            let vidLink = "https://youtube.com/watch?v=" + vidID
            let vidIconDiv = $("<a>").attr("href", vidLink)
            vidIconDiv.append($("<img>").attr("src", vidIcon))
            $("#youtube-results").append(vidTitleDiv, vidIconDiv)

        })
    });
    initIngredients();
});