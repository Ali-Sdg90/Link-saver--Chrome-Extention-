let saveData = [];
const inputEl = document.getElementById("input-el");
const dataEl = document.getElementById("data-el");
const saveEl = document.getElementById("save-el");
const deleteEl = document.getElementById("delete-el");
const tabEl = document.getElementById("tab-el");
let saveHtml = "";
// localStorage.clear();
let localSave = JSON.parse(localStorage.getItem("saveKey"));
if (localSave) {
    saveData = localSave;
    showEl();
}
function showEl() {
    saveHtml = "";
    let linkCounter = 0;
    for (let i = 0; i < saveData.length; i++) {
        saveHtml += `
        <li>
        <div id="delete-link${linkCounter++}">×</div>
            <a href="${saveData[i]}" target="blank">
                ${saveData[i]}
            </a>
            
        </li>
        `;
    }
    inputEl.value = "";
    dataEl.innerHTML = saveHtml;
    deleteSaves();
}
saveEl.addEventListener("click", function () {
    if (inputEl.value) {
        saveData.push(inputEl.value);
        localStorage.setItem("saveKey", JSON.stringify(saveData));
        showEl();
    }
});
tabEl.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        saveData.push(tabs[0].url);
        localStorage.setItem("saveKey", JSON.stringify(saveData));
        showEl();
    });
});
deleteEl.addEventListener("dblclick", function () {
    for (let i in localStorage) {
        delete localStorage[i];
        localSave = localSave.filter(function (item) {
            if (item) return item;
        });
    }
    localStorage.clear();
    dataEl.innerHTML = "";
    saveData = [];
    deleteSaves();
});
function deleteSaves() {
    for (let i in localSave) {
        document
            .querySelector(`#delete-link${i}`)
            .addEventListener("click", function () {
                delete localSave[i];
                localSave = localSave.filter(function (item) {
                    if (item) return item;
                });
                localStorage.setItem("saveKey", JSON.stringify(localSave));
                saveData = localSave;
                showEl();
            });
    }
}
