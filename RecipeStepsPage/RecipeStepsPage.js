var curTweakedRecipeSteps;
var curBaseRecipeSteps;

function GoBackClicked() {
    SwitchPage("recipesOverviewPage");
}

function LoadRecipeStepsPage(recipeName, recipeVersionIndex, tweakedRecipeSteps, baseRecipeSteps) {
    /* save current context for later */
    curTweakedRecipeSteps = tweakedRecipeSteps;
    curBaseRecipeSteps = baseRecipeSteps;

    /* display tweaked recipe steps */
    var StepsToDisplay = [...tweakedRecipeSteps];
    for (let index = 0; index < StepsToDisplay.length; index++) {
        StepsToDisplay[index] = "- " + StepsToDisplay[index];
    }

    document.querySelector("#recipeTitle").innerHTML = recipeName + ` v${recipeVersionIndex}`;
    document.querySelector("#recipeText").innerHTML = StepsToDisplay.join("<br>");
}

function OnSubmitClicked() {
    /* go to rate recipe tweak */
    LoadRateTweakPage(curTweakedRecipeSteps, curBaseRecipeSteps);
    SwitchPage("RateTweakPage");
}