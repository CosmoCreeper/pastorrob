const sounds = document.getElementById("sounds");
const classic = document.getElementById("classic");
const crazy = document.getElementById("crazy");

const sndArr = ["i-saw-a-reel", "cbh", "2002", "Cripplingpeople", "EhPastorRob", "Icametotheconclusion", "Ididthemath", "Ihadabout20", "Ineed3500dollars", "LoseYourself", "Moneyistheanswer", "Moneyisthesolution", "paythesebills", "Thatwasnevergonnahappen", "Theyhaveacowboyhat", "Youhavetobestrong"];
const byteArr = ["I saw a reel", "Consistent biblical hermeneutic", "I saw that in 2002", "Crippling people", "Eh", "I came to the conclusion long ago", "I did the math", "I had about 20", "I need 3500 dollars", "Lose yourself", "Money is the answer", "Money is the solution", "Pay these bills", "Never gonna happen", "Cowboy hat", "Be strong"];

const soundboard = document.getElementById("soundboard");
const overlay = document.getElementById("overlay");

const loadSounds = () => {
    sounds.innerHTML = "";
    for (let i = 0; i < sndArr.length; i++) {
        sounds.insertAdjacentHTML("beforeend", 
            `<div id="${i + 1}" class="sound" 
             onclick="playSound('${sndArr[i]}', '${byteArr[i]}');" onmouseenter="screen.textContent = '${byteArr[i]}'">
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

let audioCtxtArr = [];

const reset = () => {
    volume.value = 100;
    bass.value = 0;
    speed.value = 1;
    updateInputs();
};
const stopSounds = () => audioCtxtArr.forEach((el) => el.close()).then(() => audioCtxtArr = []);

const playSound = (snd, byte) => {
    const audio = new Audio(`./assets/sounds/${snd}.mp3`);

    audioCtxtArr.push(new (window.AudioContext || window.webkitAudioContext)());
    const audioContext = audioCtxtArr[audioCtxtArr.length - 1];

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

    screen.textContent = byte;
}

const display = (el) => {
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
    }
}