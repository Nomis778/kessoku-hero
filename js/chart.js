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
        new Lane([{"hitTime": 2}, {"hitTime": 4}]),
        new Lane([{"hitTime": 6}, {"hitTime": 10}]),
        new Lane([{"hitTime": 6}, {"hitTime": 20}]),
        new Lane([{"hitTime": 5}, {"hitTime": 7}])
    ],
}

export default chart

