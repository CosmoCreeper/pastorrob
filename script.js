const sounds = document.getElementById("sounds");
const classic = document.getElementById("classic");
const crazy = document.getElementById("crazy");

const clSndArr = ["", "", "", "", "", "", "", "", ""];
const crSndArr = ["", "", ""];

const loadSounds = (tab) => {
    sounds.innerHTML = "";
    for (let i = 0; i < (tab === "cl" ? clSndArr : crSndArr).length; i++) {
        sounds.insertAdjacentHTML("beforeend", 
            `<div id="${i + 1}" class="sound" 
             onclick="play('${(tab === "cl" ? clSndArr : crSndArr)[i]}');">
                ${i + 1}
             </div>
            `
        );
    }
}

loadSounds("cl");

const activateTab = (tabName) => {
    if (tabName === "classic" && !classic.classList.contains("active")) {
        crazy.classList.remove("active");
        classic.classList.add("active");
        loadSounds("cl");
    } else if (tabName === "crazy" && !crazy.classList.contains("active")) {
        crazy.classList.add("active");
        classic.classList.remove("active");
        loadSounds("cr");
    }
}