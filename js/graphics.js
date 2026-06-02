import chart from "./chart";
import {getAudioTime} from "./audio";

const FALL_TIME_SECONDS = 1.5
const HIT_Y = 100
const NOTE_WIDTH = 15;
const NOTE_HEIGHT = 5;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export default function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawHitLine()
    drawNotes()
    requestAnimationFrame(updateCanvas)
}

function drawNotes() {
    const audioTime = getAudioTime()

    ctx.fillStyle = "black"
    chart.notes.forEach(note => {
        const currFallTime = (note.hitTime - audioTime) - FALL_TIME_SECONDS
        const currFallPercent = currFallTime / FALL_TIME_SECONDS
        ctx.fillRect(10, -(currFallPercent * HIT_Y), NOTE_WIDTH, NOTE_HEIGHT)
    })
}

function drawHitLine() {
    ctx.fillStyle = 'red'
    ctx.fillRect(10, HIT_Y, NOTE_WIDTH, NOTE_HEIGHT)
}