import {getAudioTime, pauseAudio, playAudio} from "./audio.js";
import updateCanvas from "./graphics";
import {updateState} from "./state";

$("#start-btn").click(function () {
    playAudio();
});

addEventListener("keydown", logKeyPressed);

function logKeyPressed(event) {
    const time = getAudioTime();
    console.log(event.key, "Pressed at", time);
}

let rafId = requestAnimationFrame(gameLoop);

function gameLoop() {
    const audioTime = getAudioTime();
    updateState(audioTime);
    updateCanvas(audioTime);
    requestAnimationFrame(gameLoop);
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        playAudio();
        cancelAnimationFrame(rafId);
    } else {
        pauseAudio();
        rafId = requestAnimationFrame(gameLoop);
    }
});