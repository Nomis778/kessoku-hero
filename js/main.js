const audio = new Audio("resources/audio/placeholder.mp4");

$("#start-btn").click(function () {
    audio.play();
})

addEventListener("keyup", logKeyPressed)

function logKeyPressed(event) {
    const time = audio.currentTime;
    console.log(event.key, "Pressed at", time)
}