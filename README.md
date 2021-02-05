# Shop Your Pantry 

## Table of Contents 

* [Overview](#Overview)
* [Access](#Access)
* [User Story](#User-Story)
* [Details](#Details)
* [Team](#Team)

## Overview

![Alt text](./assets/shopYourPantry.png?raw=true "SYP Logo")

The Shop Your Pantry (SYP) application allows users to input a list of ingredients they already have in their panty and use those ingredients to generate a list of recipes that incorporate the incredients. The user can then click on each recipe to find what ingredients they'll need to find and a companion YouTube video for the recipe. 

## Access

You can find the deployed webpage here: 

You can find the GitHub repo here: https://github.com/caitlin-emily/shopYourPantry

## User Story

AS A home chef on a budget

I WANT to be able to get recipes based on what’s already in my panty, get prices for what is not, and watch a video on how to make the recipe

SO THAT I can cook the most delicious and frugal meal that I can, with good instruction

## Details

This application allows users to enter ingredients they already have in their pantry to find recipes that utilize those ingredients, thus "shopping" in their own pantry. The applicaiton makes use of the Spponacular API to use the searched ingredients and find recipes. More on the Spoonacular API can be found here: https://spoonacular.com/food-api The application will display five recipes for the searched ingredients. 

Each of the five recipes returned is clickable within the application. When a user clicks on the individual recipe card, a "recipe details" card will appear. This details card allows the user to click through to the recipe steps on the spoonacular site, gives them a list of missing ingredients and prices of missing ingredients they will need to still buy to make the recipe, and a YouTube "companion" video. 

The YouTube "companion" video is generated through the Google API and uses the recipe title as the search term for YouTube. It returns a video thumbnail, which is clickable through to the actual video, and the video title. More on the Google API, which is available through the Google Cloud Platform, can be found here: https://console.cloud.google.com/apis. 

This application was created as part of the Georgia Tech Coding Bootcamp that teaches full-stack development. This application was created as the first of three group projects for the class.

## Team

![Alt text](./assets/MIGHTY-2.png?raw=true "SYP Logo")

This application was developed by the Mighty Bluejays team, consisting of four team members:
* Oliver, @acbewley
* Charles, @charles198618
* Courtney, @CFox2019
* Caitlin, @caitlin-emily