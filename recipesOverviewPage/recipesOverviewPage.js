var recipes_list_elements = [];

function reset_recipes_list() {
    recipes_list_elements = [];
    document.getElementById("recipes_list").replaceChildren();
    var recipes = load_recipes_json_Object();
    for (let i = 0; i < recipes.length; i++) {
        add_list_item(recipes[i]);
    }
}

var collapsible_content_id_counter = 0;
/**
 * adds a new list item element to the web app form (doesn't alter the stored recipes json)
 * @param {object} item - has fields: name {str}, BaseRecipe {list(str)}, Trials{list(object)}
 */
function add_list_item(item) {
    var template_list_element = document.getElementById("recipes_list_element_template");
    var new_list_element = template_list_element.content.firstElementChild.cloneNode(true);

    /* initialize fields */
    new_list_element.querySelector(".listElementName").innerHTML = item.name;
    new_list_element.querySelector(".collapsible").setAttribute("collapsible_content_id", collapsible_content_id_counter);
    new_list_element.querySelector(".collapsibleContent").setAttribute("collapsible_content_id", collapsible_content_id_counter);
    new_list_element.querySelector(".listElementName").setAttribute("indexInRecipesList", recipes_list_elements.length);

    new_list_element = document.getElementById("recipes_list").appendChild(new_list_element);
    add_collapsible(new_list_element.querySelector(".collapsible"));

    recipes_list_elements.push(new_list_element);

    collapsible_content_id_counter++;
}

function OnCLick() {
    alert("HI");
}

function addNewRecipeButtonClicked() {
    SwitchPage("MakeNewRecipePage");
}

function OnOptionsClicked() {
    SwitchPage("OptionsPage");
}

function OnStartNextTweakedRecipe(element) {
    var recipes = load_recipes_json_Object();
    RecipeIndex = element.querySelector(".listElementName").getAttribute("indexInRecipesList")
    var selectedRecipe = recipes[RecipeIndex]
    LoadRecipeStepsPage(selectedRecipe.name, 0, selectedRecipe.versions[0].BaseRecipe, selectedRecipe.versions[0].BaseRecipe);
    SwitchPage("RecipeStepsPage");
}
reset_recipes_list()