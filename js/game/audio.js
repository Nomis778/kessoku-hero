const audio = new Audio("../resources/audio/placeholder.mp4");

export function playAudio() {
    audio.play();
}

export function pauseAudio() {
    audio.pause();
}

export function getAudioTime() {
    return audio.currentTime;
}
