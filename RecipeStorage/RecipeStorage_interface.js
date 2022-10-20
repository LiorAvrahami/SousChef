
var is_memory_under_lockdown = false;

function open_corrupt_json_window(json_string) {
    alert("recipes json is corrupt");
    if (query_string_params.MemorySafety != "Unsafe") {
        is_memory_under_lockdown = true;
    }
}

/**
 * @returns the JSON object that contains all the recipes and their trials data
 */
function load_recipes_json_Object() {
    try {
        var recipes_str = localStorage['recipes'];
    } catch (error) {
        alert("error when loading recipes:\n" + String(error))
        throw error;
    }
    if (recipes_str == undefined) {
        alert("recipes could not be found");
        return "[]";
    }
    try {
        var recipes = JSON.parse(recipes_str);
        is_memory_under_lockdown = false;
        return recipes;
    } catch {
        open_corrupt_json_window();
        return "[]";
    }


}

function save_recipes_json_Object(recipes) {
    if (is_memory_under_lockdown) {
        alert("save aborted!\n this is because the app is currently in a memory-lockdown state." +
            " this happened because the last attempt to load memory was corrupt, and thus " +
            " we don't want to allow you to overwrite your (possibly corrupt) old data");
        return;
    }
    try {
        localStorage['recipes'] = JSON.stringify(recipes);
    } catch (error) {
        alert("error when saving recipes:\n" + String(error))
        throw error;
    }
}

/**
 * this functions basically compares two arrays of strings
 * @param {array of strings} Steps1 
 * @param {array of strings} Steps2 
 */
function compareRecipeSteps(Steps1, Steps2) {
    if (Steps1.length != Steps2.length) {
        return false;
    }
    for (let index = 0; index < Steps1.length; index++) {
        if (Steps1[index] != Steps2[index]) {
            return false;
        }
    }
    return true;
}

/**
 * 
 * @param {json object} recipesJsonObject 
 * @param {array of strings} recipeSteps 
 * @returns {tuple of ints} returns a tuple with two entries. the first is the index of the recipe, and the second is the index of the version
 */
function findRecipeVersionCoordinates(recipesJsonObject, recipeSteps) {
    for (let recipeIdx = 0; recipeIdx < recipesJsonObject.length; recipeIdx++) {
        const curRecipe = recipesJsonObject[recipeIdx];
        for (let versionIdx = 0; versionIdx < curRecipe.versions.length; versionIdx++) {
            isMatch = compareRecipeSteps(curRecipe.versions[versionIdx].BaseRecipe, recipeSteps);
            if (isMatch) {
                // target version was found
                return [recipeIdx, versionIdx]
            }
        }
    }
    return null;
}

/**
 * checks that each "BaseRecipe" in the the given recipe json object is unique
 * @param {json object} recipesJsonObject 
 * @returns null of no non-unique points were found. else returns a the pair of coordinates of the two recipe versions that are duplicates.
 * each coordinate is also in itself a pair of the form: [recipeIndex, versionIndex]. 
 * thus the return value is of the form: [[recipeIdx1, versionIdx1], [recipeIdx2, versionIdx2]].
 */
function checkRecipeStepsAreUnique(recipesJsonObject) {
    for (let recipeIdx1 = 0; recipeIdx1 < recipesJsonObject.length; recipeIdx1++) {
        const curRecipe1 = recipesJsonObject[recipeIdx1];
        for (let recipeIdx2 = 0; recipeIdx2 < recipesJsonObject.length; recipeIdx2++) {
            const curRecipe2 = recipesJsonObject[recipeIdx2];
            for (let versionIdx1 = 0; versionIdx1 < curRecipe1.versions.length; versionIdx1++) {
                for (let versionIdx2 = 0; versionIdx2 < curRecipe2.versions.length; versionIdx2++) {
                    if (recipeIdx1 == recipeIdx2 && versionIdx1 == versionIdx2) {
                        continue;
                    }
                    isMatch = compareRecipeSteps(curRecipe1.versions[versionIdx1].BaseRecipe, curRecipe2.versions[versionIdx2].BaseRecipe);
                    if (isMatch) {
                        return [[recipeIdx1, versionIdx1], [recipeIdx2, versionIdx2]];
                    }
                }
            }
        }
    }
    return null;
}