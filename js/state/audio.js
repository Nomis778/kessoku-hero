import chart from "../chart/chart";

const audio = new Audio(chart.source);

export function playAudio() {
    audio.play();
}

export function pauseAudio() {
    audio.pause();
}

export function restartAudio() {
    audio.pause()
    audio.currentTime = 0;
    audio.play();
}

export function getAudioTime() {
    return audio.currentTime;
}