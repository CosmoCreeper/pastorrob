const sounds = document.getElementById("sounds");
const classic = document.getElementById("classic");
const crazy = document.getElementById("crazy");

const sndArr = ["i-saw-a-reel", "cbh", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
const byteArr = ["I saw a reel", "Consistent biblical hermeneutic"];

const soundboard = document.getElementById("soundboard");
const overlay = document.getElementById("overlay");

const loadSounds = () => {
    sounds.innerHTML = "";
    for (let i = 0; i < sndArr.length; i++) {
        sounds.insertAdjacentHTML("beforeend", 
            `<div id="${i + 1}" class="sound tooltip" 
             onclick="playSound('${sndArr[i]}');">
                <div class="tooltiptext">
                    ${byteArr[i] ? byteArr[i] : "Unavailable"}
                </div>
             </div>
            `
        );
    }
}

loadSounds();

const volume = document.getElementById("volume");
const bass = document.getElementById("bass");
const treble = document.getElementById("treble");

const updateInputs = () => {
    volume.nextElementSibling.textContent = 
        volume.value + "%";
    bass.nextElementSibling.textContent = 
        (bass.value < 0 ? "" : "+") + bass.value + " dB";
    treble.nextElementSibling.textContent = 
        (treble.value < 0 ? "" : "+") + treble.value + " dB";
}

let audioCtxtArr = [];

const reset = () => {
    volume.value = 100;
    bass.value = 0;
    treble.value = 0;
    updateInputs();
};
const stopSounds = () => audioCtxtArr.forEach((el) => el.close()).then(() => audioCtxtArr = []);

const playSound = (snd) => {
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

    const trebleFilter = audioContext.createBiquadFilter();
    trebleFilter.type = 'highshelf'; // Use 'highshelf' for treble
    trebleFilter.frequency.setValueAtTime(3000, audioContext.currentTime); // Frequency for treble
    trebleFilter.gain.setValueAtTime(treble.value, audioContext.currentTime); // Initial gain for treble

    // Create a GainNode for volume control
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(volume.value / 100, audioContext.currentTime); // Initial volume

    // Connect the audio graph
    track.connect(bassFilter);
    bassFilter.connect(trebleFilter);
    trebleFilter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Play the audio
    audio.play();
}