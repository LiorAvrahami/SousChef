var all_collapsibles_list = document.getElementsByClassName("collapsible");

/* Interface (API): */
function collapseAll() {
    all_collapsible_content_list = document.getElementsByClassName("collapsibleContent");
    for (var i = 0; i < all_collapsible_content_list.length; i++) {
        all_collapsible_content_list[i].classList.remove("active");
        var collapsibleContent = all_collapsible_content_list[i];
        collapsibleContent.style.display = "none";
    }
}

function add_collapsible(collapsible) {
    all_collapsibles_list = document.getElementsByClassName("collapsible");
    collapsible.addEventListener("click", on_collapsible_click);
}

function remove_collapsible(collapsible) {
    all_collapsibles_list = document.getElementsByClassName("collapsible");
    collapsible.removeEventListener("click", on_collapsible_click);
}

/* Private functions */
function findCollapsibleContent(collapsible) {
    let collapsible_content_id = collapsible.getAttribute("collapsible_content_id");
    return document.querySelectorAll(`div.collapsibleContent[collapsible_content_id="${collapsible_content_id}"]`)[0];
}

function on_collapsible_click() {
    all_collapsibles_list = document.getElementsByClassName("collapsible");
    let collapsibleContent = findCollapsibleContent(this)
    let wasOpen = collapsibleContent.style.display == "block";
    collapseAll()
    if (!wasOpen) {
        collapsibleContent.style.display = "block";
    }
}

// add all tha collapsibles that are defined in the html
for (var i = 0; i < all_collapsibles_list.length; i++) {
    add_collapsible(all_collapsibles_list[i]);
}