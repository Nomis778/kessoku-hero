import {setAudioSource} from "../state/audio";
import {loadNotes} from "../state/noteState";

let chart;

const songLabel = document.querySelector("#song");

export function loadChart(name) {
    fetch(`../resources/charts/${name}.json`)
        .then(response => response.json()
        .then(data => {
            chart = data;

            // Translates the chart from beats into audioTime, which is used by the game
            chart.lanes.forEach(lane => {
                lane.forEach(note => {
                    note.hitTime = chart.startTimeSeconds + (note.hitBeat / (chart.bpm / 60));
                })
            })

            setAudioSource(chart.source);
            loadNotes();
            songLabel.innerHTML = `${chart.band} - ${chart.name}`;
        }))
}

export function getCurrentChart() {
    return chart;
}