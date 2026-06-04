const audio = new Audio("../resources/audio/seishun.mp3");

export function playAudio() {
    audio.play();
}

export function pauseAudio() {
    audio.pause();
}

export function getAudioTime() {
    return audio.currentTime;
}
