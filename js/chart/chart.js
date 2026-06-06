import {setAudioSource} from "../state/audio";

class Lane {
    index = 0;

    constructor(notes) {
        this.notes = notes;
    };

    next() {
        return this.notes[this.index]
    }

    incrementIndex() {
        this.index++
    }
}

let chart;

const songLabel = document.querySelector("#song");

export function loadChart(url) {
    fetch(url)
        .then(response => response.json()
        .then(data => {
            chart = {
                ...data,
                lanes: data.lanes.map(lane => new Lane(lane))
            }

            // Translates the chart from beats into audioTime, which is used by the game
            chart.lanes.forEach(lane => {
                lane.notes.forEach(note => {
                    note.hitTime = chart.startTimeSeconds + (note.hitBeat / (chart.bpm / 60));
                })
            })

            setAudioSource(chart.source);
            songLabel.innerHTML = `${chart.band} - ${chart.name}`;
        }))
}

export function rewindChart() {
    chart.lanes.forEach(lane => {
        lane.index = 0;
    })
}

export function getCurrentChart() {
    return chart;
}