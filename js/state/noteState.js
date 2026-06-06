import {getHitType, HitType} from "./hit-type";
import {addToStatistics} from "./stats";
import {DROP_AFTER_SECONDS, NUM_LANES, SPAWN_BEFORE_SECONDS} from "../constants";
import {getCurrentChart} from "../chart/chart";

class ChartLane {
    index = 0;

    constructor(notes) {
        if(!notes)
            this.notes = []
        else
            this.notes = notes;
    };

    next() {
        return this.notes[this.index]
    }

    incrementIndex() {
        this.index++
    }
}

let currentLanes = [];
let chartLanes = [];

export function updateNotes(audioTime) {
    spawnNotes(audioTime);
    dropOldNotes(audioTime);
}

export function getCurrentLanes() {
    return currentLanes;
}

export function registerHit(hitTime, lane) {
    const note = getClosestNote(hitTime, lane)
    let diff = Number.MAX_VALUE;
    if (note)
        diff = Math.abs(note.hitTime - hitTime);

    const hitType = getHitType(diff)

    if (hitType !== HitType.MISS)
        removeNote(note, lane);

    addToStatistics(hitType)
}

export function resetNotes() {
    loadNotes();
}

export function loadNotes() {
    const chart = getCurrentChart();
    for (let i = 0; i < NUM_LANES; i++) {
        currentLanes[i] = [];
        chartLanes[i] = new ChartLane(chart.lanes[i]);
    }
}

function spawnNotes(audioTime) {
    for (let i = 0; i < chartLanes.length; i++) {
        const lane = chartLanes[i];
        if (lane.next() && lane.next().hitTime <= audioTime + SPAWN_BEFORE_SECONDS) {
            currentLanes[i].push(lane.next());
            lane.incrementIndex();
        }
    }
}

function dropOldNotes(audioTime) {
    currentLanes.forEach(lane => {
        while (lane.length && lane[0].hitTime + DROP_AFTER_SECONDS < audioTime) {
            addToStatistics(HitType.MISS);
            lane.shift();
        }}
    );
}

function getClosestNote(audioTime, lane) {
    let closest = null;
    let closestDiff = Number.MAX_VALUE;
    currentLanes[lane].forEach(note => {
        const diff = Math.abs(note.hitTime - audioTime);
        if (diff < closestDiff) {
            closest = note;
            closestDiff = diff;
        }
    });
    return closest;
}

function removeNote(note, lane) {
    currentLanes[lane].splice(currentLanes[lane].indexOf(note), 1);
}