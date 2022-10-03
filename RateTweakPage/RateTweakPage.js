var currentRecipeToRate;

function LoadRateTweakPage(recipeToRate) {
    currentRecipeToRate = recipeToRate;
}

function SkipClicked() {
    SwitchPage("recipesOverviewPage");
}
function OnSubmitRatingClicked() {
    SwitchPage("recipesOverviewPage");
}