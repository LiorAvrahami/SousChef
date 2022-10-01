
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