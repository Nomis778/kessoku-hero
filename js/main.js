import {getAudioTime, pauseAudio, playAudio} from "./state/audio.js";
import updateCanvas from "./graphics/render";
import {registerHit, updateNotes} from "./state/notes";
import {KEYBINDS} from "./constants";
import {initResizeListeners, updateLayoutForCurrentSize} from "./graphics/layout";
import {initStatisticsListeners} from "./state/score-ui";


init()

function init() {
    updateLayoutForCurrentSize();
    initResizeListeners();

    initStatisticsListeners();

    initInputHandling();

    initGameLoop();
}

let isStarted = false;

document.querySelector("#start").addEventListener("click", function () {
    if (!isStarted) {
        isStarted = true;
        playAudio();
    }
})

document.querySelector("#restart").addEventListener("click", function () {
    if (isStarted) {
        // reset state
        playAudio();
    }
})

function initInputHandling() {
    addEventListener("keydown", onKeyPress);

    function onKeyPress(event) {
        const audioTime = getAudioTime();
        const lane = KEYBINDS[event.key];
        if (lane === undefined)
            return;

        registerHit(audioTime, lane);
    }
}

function initGameLoop() {
    let rafId = requestAnimationFrame(gameLoop);

    // Pauses game if window is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseAudio();
            cancelAnimationFrame(rafId);
        } else {
            playAudio();
            rafId = requestAnimationFrame(gameLoop);
        }
    });
}

function gameLoop() {
     const audioTime = getAudioTime();
     updateNotes(audioTime);
     updateCanvas(audioTime);
     requestAnimationFrame(gameLoop);
}