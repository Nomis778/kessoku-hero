import {addAudioListener, getAudioTime, pauseAudio, playAudio, resetAudio} from "./state/audio.js";
import updateCanvas from "./graphics/render";
import {registerHit, resetNotes, updateNotes} from "./state/noteState";
import {KEYBINDS} from "./constants";
import {initResizeListeners, updateLayoutForCurrentWindowSize} from "./graphics/layout";
import {initStatisticsListeners} from "./graphics/stats-ui";
import {checkAndSetHighScore, resetStatistics} from "./state/stats";
import {loadChart} from "./chart/chart";

init()

function init() {
    updateLayoutForCurrentWindowSize();
    initResizeListeners();

    loadChart("../resources/charts/seishun.json");
    addAudioListener("ended", checkAndSetHighScore);
    addAudioListener("ended", reset);

    initStatisticsListeners();
    initInputHandling();
    initGameLoop();
}

document.querySelector("#start").addEventListener("click", start);
document.querySelector("#reset").addEventListener("click", reset);


let isStarted = false;

function start() {
    if (!isStarted) {
        isStarted = true;
        playAudio();
    }
}

function reset() {
    if (isStarted) {
        resetNotes();
        resetStatistics();
        resetAudio();
        isStarted = false;
    }
}

function initInputHandling() {
    addEventListener("keydown", event => {
        if(!isStarted)
            return;

        const audioTime = getAudioTime();
        const lane = KEYBINDS[event.key];
        if (lane === undefined)
            return;

        registerHit(audioTime, lane);
    });
}

function initGameLoop() {
    let rafId = requestAnimationFrame(gameLoop);

    // Pauses game if window is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (isStarted)
                pauseAudio();
            cancelAnimationFrame(rafId);
        } else {
            if (isStarted)
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