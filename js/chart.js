const chart = {
    "notes": [
        {
            "hitTime": 6
        },
        {
            "hitTime": 7
        }
    ],
    "index": 0,

    "next": function () {
        return this.notes[this.index]
    },

    "incrementIndex": function () {
        this.index++
    }
}

export default chart
