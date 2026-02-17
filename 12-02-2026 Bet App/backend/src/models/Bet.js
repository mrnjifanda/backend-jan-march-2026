const { Schema, model } = require('mongoose');

const betSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    match: {
        type: Schema.Types.ObjectId,
        ref: 'matchs',
        required: true
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
    status: {
        type: String,
        enum: ['pending', 'won', 'lost'],
        required: true,
        default: 'pending'
    }
}, { timestamps: true });

const Bet = model('bets', betSchema);

module.exports = Bet;
