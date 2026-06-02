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
        return notes[index]
    },

    "incrementIndex": function () {
        index++
    }
}

export default chart
