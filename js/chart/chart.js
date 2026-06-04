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

const chart = {
    "bpm": 190,
    "source": "../resources/audio/seishun.mp3",
    "lanes": [
        new Lane([
            // Intro
            {"hitBeat": 13.5}, {"hitBeat": 15.5},
            {"hitBeat": 21.5},
            {"hitBeat": 29.5}, {"hitBeat": 31.5},
            {"hitBeat": 36.5}, {"hitBeat": 38},

            // Verse
            {"hitBeat": 45.5}, {"hitBeat": 47.5},
            {"hitBeat": 53.5},
            {"hitBeat": 61.5}, {"hitBeat": 63.5},

            // Verse lick
            {"hitBeat": 80.5}, {"hitBeat": 83},

            // Verse 2
            {"hitBeat": 93.5, "holdBeat": 0.5}, {"hitBeat": 94.5},
            {"hitBeat": 102},
            {"hitBeat": 109.5, "holdBeat": 0.5}, {"hitBeat": 110.5},
        ]),

        new Lane([
            // Intro
            {"hitBeat": 14}, {"hitBeat": 15},
            {"hitBeat": 22, "holdBeat": 1},
            {"hitBeat": 30}, {"hitBeat": 31},
            {"hitBeat": 36.5}, {"hitBeat": 37.5}, {"hitBeat": 38.5},

            // Verse
            {"hitBeat": 46}, {"hitBeat": 47},
            {"hitBeat": 54, "holdBeat": 1},
            {"hitBeat": 62}, {"hitBeat": 63},

            // Verse lick
            {"hitBeat": 73.5}, {"hitBeat": 75}, {"hitBeat": 75.5},
            {"hitBeat": 76.5}, {"hitBeat": 77.5}, {"hitBeat": 80}, {"hitBeat": 81},

            // Verse 2
            {"hitBeat": 89.5, "holdBeat": 0.5}, {"hitBeat": 90.5},
            {"hitBeat": 93.5, "holdBeat": 0.5},
            {"hitBeat": 97.5, "holdBeat": 0.5}, {"hitBeat": 98.5},
            {"hitBeat": 101.5},
            {"hitBeat": 105.5, "holdBeat": 0.5}, {"hitBeat": 106.5},
            {"hitBeat": 109.5, "holdBeat": 0.5},

            // "Bridge"
            {"hitBeat": 121}, {"hitBeat": 123},
        ]),

        new Lane([
            //Intro
            {"hitBeat": 14.5},
            {"hitBeat": 30.5},
            {"hitBeat": 37}, {"hitBeat": 39},

            // Verse
            {"hitBeat": 46.5},
            {"hitBeat": 62.5},

            // Verse lick
            {"hitBeat": 72}, {"hitBeat": 72.5}, {"hitBeat": 73}, {"hitBeat": 74}, {"hitBeat": 76},
            {"hitBeat": 82.5},

            // Verse 2
            {"hitBeat": 89.5, "holdBeat": 0.5},
            {"hitBeat": 97.5, "holdBeat": 0.5},
            {"hitBeat": 101},
            {"hitBeat": 105.5, "holdBeat": 0.5},

            // "Bridge"
            {"hitBeat": 121}, {"hitBeat": 123},
        ]),

        new Lane([
            // Intro
            {"hitBeat": 9.5},
            {"hitBeat": 17.5},
            {"hitBeat": 25.5},
            {"hitBeat": 33.5},

            // Verse
            {"hitBeat": 41.5},
            {"hitBeat": 49.5},
            {"hitBeat": 57.5},
            {"hitBeat": 65.5},

            // Verse lick
            {"hitBeat": 78}, {"hitBeat": 79},

            // Verse 2
            {"hitBeat": 88, "holdBeat": 0.5}, {"hitBeat": 89},
            {"hitBeat": 92, "holdBeat": 0.5}, {"hitBeat": 93},
            {"hitBeat": 96, "holdBeat": 0.5}, {"hitBeat": 97},
            {"hitBeat": 100.5},
            {"hitBeat": 104, "holdBeat": 0.5}, {"hitBeat": 105},
            {"hitBeat": 108, "holdBeat": 0.5}, {"hitBeat": 109},

            // "Bridge"
            {"hitBeat": 120}, {"hitBeat": 122},
        ]),

        new Lane([
            // Intro
            {"hitBeat": 8}, {"hitBeat": 8.5}, {"hitBeat": 9}, {"hitBeat": 9.5}, {"hitBeat": 10.5}, {"hitBeat": 11.5},
            {"hitBeat": 12.5},
            {"hitBeat": 16}, {"hitBeat": 16.5}, {"hitBeat": 17}, {"hitBeat": 17.5}, {"hitBeat": 18.5}, {"hitBeat": 19.5},
            {"hitBeat": 20.5},
            {"hitBeat": 24}, {"hitBeat": 24.5}, {"hitBeat": 25}, {"hitBeat": 25.5}, {"hitBeat": 26.5}, {"hitBeat": 27.5},
            {"hitBeat": 28.5},
            {"hitBeat": 32}, {"hitBeat": 32.5}, {"hitBeat": 33}, {"hitBeat": 33.5}, {"hitBeat": 34.5}, {"hitBeat": 35.5},

            // Verse
            {"hitBeat": 40}, {"hitBeat": 40.5}, {"hitBeat": 41}, {"hitBeat": 41.5}, {"hitBeat": 42.5}, {"hitBeat": 43.5},
            {"hitBeat": 44.5},
            {"hitBeat": 48}, {"hitBeat": 48.5}, {"hitBeat": 49}, {"hitBeat": 49.5}, {"hitBeat": 50.5}, {"hitBeat": 51.5},
            {"hitBeat": 52.5},
            {"hitBeat": 56}, {"hitBeat": 56.5}, {"hitBeat": 57}, {"hitBeat": 57.5}, {"hitBeat": 58.5}, {"hitBeat": 59.5},
            {"hitBeat": 60.5},
            {"hitBeat": 64}, {"hitBeat": 64.5}, {"hitBeat": 65}, {"hitBeat": 65.5}, {"hitBeat": 66.5}, {"hitBeat": 67.5},
            {"hitBeat": 68.5},

            // Verse lick
            {"hitBeat": 78.5}, {"hitBeat": 82}, {"hitBeat": 84, "holdBeat": 2},

            // Verse 2
            {"hitBeat": 88, "holdBeat": 0.5},
            {"hitBeat": 92, "holdBeat": 0.5},
            {"hitBeat": 96, "holdBeat": 0.5},
            {"hitBeat": 100}, {"hitBeat": 102.5},
            {"hitBeat": 104, "holdBeat": 0.5},
            {"hitBeat": 108, "holdBeat": 0.5},

            // "Bridge"
            {"hitBeat": 120}, {"hitBeat": 122},
        ]),
    ],

    // Will translate the chart from beats into audioTime, which is used by the game
    "init": function() {
        this.lanes.forEach(lane => {
            lane.notes.forEach(note => {
                note.hitTime = note.hitBeat / (this.bpm / 60);
            })
        })
   },

   "resetLanes": function() {
        this.lanes.forEach(lane => {
            lane.index = 0;
        })
   }
}

chart.init();
export default chart;

