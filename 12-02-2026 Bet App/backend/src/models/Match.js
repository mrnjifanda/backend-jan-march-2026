const { Schema, model } = require('mongoose');

const matchSchema = new Schema({
    time: {
        type: Date,
        required: true
    },
    teamA: {
        type: String,
        min: 4,
        max: 50,
        trim: true,
        required: true
    },
    teamB: {
        type: String,
        min: 4,
        max: 50,
        trim: true,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    oddA: {
        type: Number,
        required: true,
        default: 1
    },
    oddB: {
        type: Number,
        required: true,
        default: 1
    },
    status: {
        type: String,
        required: true,
        enum: ['upcoming', 'ongoing', 'finished'],
        default: 'upcoming'
    },
    scoreA: {
        type: Number,
        required: true,
        default: 0
    },
    scoreB: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true });

const Match = model('matchs', matchSchema);

module.exports = Match;
