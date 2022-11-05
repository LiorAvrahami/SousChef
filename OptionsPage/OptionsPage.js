var curTweakedRecipeSteps;
var curBaseRecipeSteps;

function GoBackClicked() {
    reset_recipes_list();
    SwitchPage("recipesOverviewPage");
}

async function OnImportClicked() {
    var recipes_str = await navigator.clipboard.readText();
    var recipes = JSON.parse(recipes_str);
    save_recipes_json_Object(recipes);
}

function OnExportClicked() {
    var recipes_str = JSON.stringify(load_recipes_json_Object());
    navigator.clipboard.writeText(recipes_str);
}