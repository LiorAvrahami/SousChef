var recipes_str = document.getElementById("recipes_for_tests").innerHTML;
var recipes = JSON.parse(recipes_str);

var recipes_list_elements = [];

function reset_recipes_list() {
    for (let i = 0; i < recipes.length; i++) {
        add_list_item(recipes[i]);
    }
    add_new_recipe_list_item();
}

var collapsible_content_id_counter = 0;
/**
 * adds a new list item element to the web app form (doesn't alter the stored recipes json)
 * @param {object} item - has fields: name {str}, BaseRecipe {list(str)}, Trials{list(object)}
 */
function add_list_item(item) {
    var template_list_element = document.getElementById("recipes_list_element");
    var new_list_element = template_list_element.content.firstElementChild.cloneNode(true);

    /* initialize fields */
    new_list_element.querySelector(".listElementName").innerHTML = item.name;
    new_list_element.querySelector(".collapsible").setAttribute("collapsible_content_id", collapsible_content_id_counter);
    new_list_element.querySelector(".collapsibleContent").setAttribute("collapsible_content_id", collapsible_content_id_counter);

    new_list_element = document.getElementById("recipes_list").appendChild(new_list_element);
    add_collapsible(new_list_element.querySelector(".collapsible"));

    recipes_list_elements.push(new_list_element);

    collapsible_content_id_counter++;
}

/**
 * adds a new list item element to the web app form (doesn't alter the stored recipes json)
 * @param {object} item - has fields: name {str}, BaseRecipe {list(str)}, Trials{list(object)}
 */
function add_new_recipe_list_item() {
    var template_list_element = document.getElementById("new_recipes_list_element");
    var new_list_element = template_list_element.content.firstElementChild.cloneNode(true);

    new_list_element = document.getElementById("recipes_list").appendChild(new_list_element);

    recipes_list_elements.push(new_list_element);
}

function OnCLick() {
    alert("HI");
}

function addNewRecipeButtonClicked() {
    SwitchPage("MakeNewRecipePage");
}
reset_recipes_list()