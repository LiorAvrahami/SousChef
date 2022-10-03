const query_string_params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
});

function SwitchPage(targetPageId) {
    /* hide all pages */
    allPages = document.querySelectorAll("body > div");
    for (var pageIdx = 0; pageIdx < allPages.length; pageIdx++) {
        allPages[pageIdx].style.display = "none";
    }
    /* show target page */
    document.getElementById(targetPageId).style.display = "block";
}