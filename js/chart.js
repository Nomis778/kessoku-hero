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
    "lanes": [
        new Lane([{"hitTime": 6}, {"hitTime": 7}]),
        new Lane([{"hitTime": 5,}, {"hitTime": 7}])
    ],
}

export default chart

