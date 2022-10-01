const query_string_params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
});

function SwitchPage(targetPageId) {
    /* hide all pages */
    document.getElementById("recipesOverviewPage").style.display = "none";
    document.getElementById("MakeNewRecipePage").style.display = "none";
    /* show target page */
    document.getElementById(targetPageId).style.display = "block";
}