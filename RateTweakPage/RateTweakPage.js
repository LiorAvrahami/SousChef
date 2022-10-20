var curTweakedRecipeSteps;
var curBaseRecipeSteps;

function LoadRateTweakPage(curTweakedRecipeSteps, curBaseRecipeSteps) {
    curTweakedRecipeSteps = curTweakedRecipeSteps;
    curBaseRecipeSteps = curBaseRecipeSteps;
}

function SkipClicked() {
    SwitchPage("recipesOverviewPage");
}

function OnSubmitRatingClicked() {
    rating = parseFloat(document.getElementById("ratingValueField").value);
    freeText = document.getElementById("FreeTextField").value;
    SubmitTrial(rating, freeText);
    SwitchPage("recipesOverviewPage");
}

/**
 * 
 * @param {number of null} rating the selected rating value
 * @param {string} freeText the free text attached to the rating
 */
function SubmitTrial(rating, freeText) {
    jsonObj = load_recipes_json_Object();
    let [recipeIdx, versionIdx] = findRecipeVersionCoordinates(jsonObj, curBaseRecipeSteps);

    trialSubtree = MakeNewTrialSubtree(rating, freeText, curTweakedRecipeSteps);

    jsonObj[recipeIdx].versions[versionIdx].Trials.push(trialSubtree);

    save_recipes_json_Object(jsonObj);
}

function MakeNewTrialSubtree(rating, freeText, TrialSteps) {
    return { "rating": rating, "freeText": freeText, "TrialSteps": TrialSteps };
}