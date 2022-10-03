var currentDisplayedRecipe;

function GoBackClicked() {
    SwitchPage("recipesOverviewPage");
}

function LoadRecipeStepsPage(recipeToShow) {
    currentDisplayedRecipe = recipeToShow;
    var recipeStepsText = recipeToShow.BaseRecipe
    for (let index = 0; index < recipeStepsText.length; index++) {
        recipeStepsText[index] = "- " + recipeStepsText[index];
    }

    document.querySelector("#recipeTitle").innerHTML = recipeToShow.name
    document.querySelector("#recipeText").innerHTML =
        recipeToShow.BaseRecipe.join("<br>")
}

function OnSubmitClicked() {
    /* go to rate recipe tweak */
    currentDisplayedRecipe
    LoadRateTweakPage(currentDisplayedRecipe)
    SwitchPage("RateTweakPage");
}