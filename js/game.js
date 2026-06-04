import {getAudioTime, pauseAudio, playAudio} from "./game/state/audio.js";
import updateCanvas from "./game/graphics/render";
import {registerHit, updateNotes} from "./game/state/notes";
import {getStatistics, onStatisticsUpdate} from "./game/state/score";
import {KEYBINDS} from "./game/constants";
import {initResizeListeners, updateLayout} from "./game/graphics/layout";

updateLayout();
initResizeListeners();

addEventListener("keydown", onKeyPress);
function onKeyPress(event) {
    const audioTime = getAudioTime();
    const lane = KEYBINDS[event.key];
    if(lane === undefined)
        return;

    registerHit(audioTime, lane);
}

let rafId = requestAnimationFrame(gameLoop);

function gameLoop() {
    const audioTime = getAudioTime();
    updateNotes(audioTime);
    updateCanvas(audioTime);
    requestAnimationFrame(gameLoop);
}

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

const points = document.querySelector("#points");
const perfect = document.querySelector("#perfect");
const good = document.querySelector("#good");
const mediocre = document.querySelector("#mediocre");
const miss = document.querySelector("#miss");
onStatisticsUpdate(function() {
    const stats = getStatistics()
    points.innerHTML = stats.points;

    const total = stats.totalHits;
    perfect.innerHTML = `${stats.numPerfect} (${toPercent(stats.numPerfect / total)}%)`;
    good.innerHTML = `${stats.numGood} (${toPercent(stats.numGood / total)}%)`;
    mediocre.innerHTML = `${stats.numMediocre} (${toPercent(stats.numMediocre / total)}%)`;
    miss.innerHTML = `${stats.numMiss} (${toPercent(stats.numMiss / total)}%)`;
})

function toPercent(number) {
    return (number * 100).toFixed();
}