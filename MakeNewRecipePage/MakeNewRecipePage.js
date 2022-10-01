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