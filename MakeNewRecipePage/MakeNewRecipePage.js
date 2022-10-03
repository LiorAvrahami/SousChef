async function onCancelClicked() {
    SwitchPage("recipesOverviewPage");
}

async function onImportClicked() {
    var text;
    await navigator.clipboard
        .readText()
        .then(clipText => text = clipText);

    alert(text)
}

function SubmitRecipe() {
    var name = document.getElementById("recipe_name_field").value;
    var steps = document.getElementById("recipe_steps_field").value.split("\n");

    var recipes = load_recipes_json_Object();
    recipes.push({ "name": name, "steps": steps })
    save_recipes_json_Object(recipes);
    reset_recipes_list();
    SwitchPage("recipesOverviewPage")
}