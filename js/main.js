import {getAudioTime, pauseAudio, playAudio} from "./audio.js";
import updateCanvas from "./graphics";
import {registerHit, updateState} from "./state";
import {getPoints} from "./score";

$("#start-btn").click(function () {
    playAudio();
});

addEventListener("keydown", onKeyPress);

function onKeyPress(event) {
    const audioTime = getAudioTime();
    registerHit(audioTime);
    console.log(getPoints());
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