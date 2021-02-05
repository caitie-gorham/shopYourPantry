// document.ready to make everything wait until the page loads
$(document).ready(function () {
    var ingredients = [];
    var storedIngredients = JSON.parse(localStorage.getItem("ingredients"));
    var missedList = [];
    // function to list all of the previously added ingredients
    function initIngredients() {
        storedIngredients = JSON.parse(localStorage.getItem("ingredients"));
        if (storedIngredients != null) {
            ingredients = storedIngredients;
            writeIngredients();
        } else if (storedIngredients === null) {

        };
    };
    // function used to clear the third column when writing new things to it
    function clearCol3() {
        $("#recip-ing").text("");
        $("#youtube-results").text("");
    };
    // takes new ingredient input and appends it to page in it's own card
    function writeIngredients() {
        $("#ing-here").text("");
        for (i = 0; i < ingredients.length; i++) {
            var ingHere = $("#ing-here");
            var ingDiv = $("<div>");
            var ingCard = $("<p>").text(ingredients[i]);
            ingCard.attr("class", "box ing-card");
            ingDiv.append(ingCard);
            ingHere.prepend(ingDiv);
        };
    };
    // click handler for add ingredients button, pushes new ingredients to the ingredients array, stores array in local storage and runs writeIngredients
    $("#ing-button").on("click", function () {
        // if statement so that blank inputs aren't added to ingredients array
        if ($("#ing-input").val() != "") {
            ingredients.push($("#ing-input").val());
            $("#ing-input").val("");
            localStorage.setItem("ingredients", JSON.stringify(ingredients));
            writeIngredients();
        } else if ($("#ing-input").val() === "") {

        };
    });
    // click handler for find recipes button
    $("#recip-button").on("click", function () {
        // sets the api url to the appropriate search parameters
        var spoonURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredients + "&ranking=2&apiKey=83b505ff599e49239f3310bad1407b22";
        $.ajax({
            url: spoonURL,
            method: "GET"
        }).then(function (res) {
            //reveals column 2
            $("#col-2").attr("class", "column");
            //for loop to write each recipe to page with it's corresponding picture
            for (i = 0; i < 5; i++) {
                var recipeCard = $("<div>");
                let recipeName = res[i].title;
                let recipeImgURL = res[i].image;
                var pName = $("<p>").text(recipeName);
                pName.attr("class", "title-text");
                recipeCard.attr("class", "box recipe-card");
                recipeCard.attr("id", i);
                recipeCard.append(pName);
                recipeCard.append($("<img>").attr("src", recipeImgURL));
                $("#col-2").prepend(recipeCard);
            };
            //click handler for choosing a recipe
            $(document).on("click", ".recipe-card", function () {
                var recipeNumb = $(this).attr("id");
                //loop to add missing ingredients to the missedList array
                for (i = 0; i < res[recipeNumb].missedIngredients.length; i++) {
                    missedList.push(res[recipeNumb].missedIngredients[i]);
                };
                //loop to call spoonacular for each missing ingredient
                for (i = 0; i < missedList.length; i++) {
                    var missedID = missedList[i].id;
                    var missedAmount = missedList[i].amount;
                    var missedUnit = missedList[i].unit;
                    var priceURL = "https://api.spoonacular.com/food/ingredients/" + missedID + "/information?amount=" + missedAmount + "&unit=" + missedUnit + "&apiKey=83b505ff599e49239f3310bad1407b22";
                    $.ajax({
                        url: priceURL,
                        method: "GET"
                    }).then(function (res) {
                        //code to write missing ingredients and prices to page in their own cards
                        var recipIng = $("#recip-ing");
                        var missedDiv = $("<div>");
                        var missedCard = $("<p>").text(res.originalName + " $" + ((res.estimatedCost.value) / 100).toFixed(2));
                        missedCard.attr("class", "box missed-card");
                        missedDiv.append(missedCard);
                        recipIng.prepend(missedDiv);
                    });
                };
            });
        });
    });
    //click handler for clear pantry button, clears ingredients array and deletes array from local storage
    $("#clear-results-button").on("click", function () {
        localStorage.removeItem("ingredients");
        ingredients = [];
        $("#ing-here").text("");
        initIngredients();
    });
    //click handler for each recipe to get youtube video info
    $(document).on("click", ".recipe-card", function () {
        clearCol3();
        let recipeName = $(this).text();
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
            //reveals video container and navigation buttons
            $("#recipe-ing-youtube-container").attr("class", "column");
            $("#video-buttons").attr("class", "buttons");
            var n = 0;
            //function to write current video (n) to page
            function writeVideo() {
                $("#youtube-results").text("");
                let vidTitle = response.items[n].snippet.title;
                let vidTitleDiv = $("<h4>").text(vidTitle);
                let vidIcon = response.items[n].snippet.thumbnails.default.url;
                let vidID = response.items[n].id.videoId;
                let vidLink = "https://youtube.com/watch?v=" + vidID;
                let vidIconDiv = $("<a>").attr("href", vidLink);
                vidIconDiv.append($("<img>").attr("src", vidIcon));
                $("#youtube-results").append(vidIconDiv, vidTitleDiv);
            };
            writeVideo();
            //click handlers for video navigation button, changes n depending on the button pressed then runs writeVideo
            $("#back-button").on("click", function () {
                if (n > 0) {
                    n--;
                    writeVideo();
                } else if (n === 0) {

                };
            });
            $("#next-button").on("click", function () {
                if (n < 4) {
                    n++;
                    writeVideo();
                } else if (n === 4) {

                };
            });
        });
    });
    //loads saved ingredients on page load
    initIngredients();
});