const sounds = document.getElementById("sounds");
const classic = document.getElementById("classic");
const crazy = document.getElementById("crazy");

const sndArr = [
    [
        "i-saw-a-reel", "cbh", "2002", "Cripplingpeople", "EhPastorRob",
        "Icametotheconclusion", "Ididthemath", "Ihadabout20", "Ineed3500dollars",
        "LoseYourself", "Moneyistheanswer", "Moneyisthesolution", "paythesebills",
        "Thatwasnevergonnahappen", "Theyhaveacowboyhat", "Youhavetobestrong"
    ],
    [
        "didyoupoopyourpants"
    ],
    [

    ]
];
const byteArr = [
    [
        "I saw a reel", "Consistent biblical hermeneutic", "I heard that in 2002",
        "Crippling people", "Eh", "I came to the conclusion long ago", "I did the math",
        "I had about 20 maybe 6", "I need 3500 dollars", "Lose yourself",
        "Money is the answer", "Money is the solution", "How am I gonna pay these bills",
        "That was never gonna happen", "Cowboy costume", "You have to be strong"
    ],
    [
        "Did you poop your pants"
    ],
    [

    ]
];

const soundboard = document.getElementById("soundboard");
const overlay = document.getElementById("overlay");

const loadSounds = () => {
    sounds.innerHTML = "";
    for (let i = 0; i < 16; i++) {
        sounds.insertAdjacentHTML("beforeend", 
            `<div id="${i + 1}" class="sound" style="box-shadow: 0 0 5px 1px red;"
             onclick="playSound('${sndArr[0][i]}');" onmouseenter="screen.textContent = '${byteArr[0][i]}'">
             </div>
            `
        );
    }
}

loadSounds();

const volume = document.getElementById("volume");
const bass = document.getElementById("bass");
const speed = document.getElementById("speed");

const screen = document.getElementById("screen");

let audioCtxtArr = [new (window.AudioContext || window.webkitAudioContext)()];

const reset = () => {
    volume.value = 100;
    bass.value = 0;
    speed.value = 1;
    updateInputs();
};
const stopSounds = () => audioCtxtArr[0].close().then(() => audioCtxtArr = [new (window.AudioContext || window.webkitAudioContext)()]);

const playSound = (snd) => {
    const audio = new Audio(`./assets/sounds/${snd}.mp3`);

    const audioContext = audioCtxtArr[0];

    // Create an audio context
    const track = audioContext.createMediaElementSource(audio);

    // Create BiquadFilterNodes for bass and treble
    const bassFilter = audioContext.createBiquadFilter();
    bassFilter.type = 'lowshelf'; // Use 'lowshelf' for bass
    bassFilter.frequency.setValueAtTime(200, audioContext.currentTime); // Frequency for bass
    bassFilter.gain.setValueAtTime(bass.value, audioContext.currentTime); // Initial gain for bass

    // Create a GainNode for volume control
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(volume.value / 100, audioContext.currentTime); // Initial volume

    audio.playbackRate = speed.value;

    // Connect the audio graph
    track.connect(bassFilter);
    bassFilter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Play the audio
    audio.play();
}

const display = (el, custom) => {
    if (el === "volume") {
        screen.textContent = volume.value + "%";
    } else if (el === "bass") {
        screen.textContent = (bass.value < 0 ? "" : "+") + bass.value + " dB";
    } else if (el === "speed") {
        screen.textContent = speed.value + "x";
    } else if (el === "title-v") {
        screen.textContent = "Volume";
    } else if (el === "title-b") {
        screen.textContent = "Bass";
    } else if (el === "title-s") {
        screen.textContent = "Speed";
    } else if (el === "reset") {
        screen.textContent = "Reset settings";
    } else if (el === "stop") {
        screen.textContent = "Stop sounds";
    } else {
        screen.textContent = custom;
    }
}

const selectBank = (bank) => {
    let color, num;
    const selected = document.getElementById(bank);
    const current = document.querySelector(".current");

    if (!selected.classList.contains("current")) {
        if (bank === 'A') {
            color = "0 0 5px 1px red";
            num = 0;
        } else if (bank === 'B') {
            color = "0 0 5px 1px lightgreen";
            num = 1;
        } else if (bank === 'C') {
            color = "0 0 5px 1px cyan";
            num = 2;
        }
    
        selected.style.border = "1px solid transparent";
        current.style.border = "1px solid rgba(255, 255, 255, 0.3)";
        selected.classList.add("current");
        current.classList.remove("current");
    
        document.querySelectorAll(".sound").forEach((el, idx) => {
            el.style.boxShadow = color;
            el.setAttribute("onclick", `playSound("${sndArr[num][idx]}")`);
            el.setAttribute("onmouseenter", `screen.textContent = "${byteArr[num][idx] || "Unavailable"}"`);
        });
    }
}