const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    sessionCode: {
        type: Number,
        required: true,
        unique: true
    },
    sessionTimer: {
        type: Number,
        required: true,
        unique: false
    },
    sessionType: {
        type: String,
        required: false
    },
    sessionDataUsa: {
        type: [{
            resourceOwner: String,
            voteOwner: String,
            state1: String,
            state2: String,
            block: String,
            task: String,
            resources: String
        }],
        required: false
    },
    sessionDataRussia: {
        type: [{
            resourceOwner: String,
            voteOwner: String,
            state: String,
            block: String,
            task: String,
            resources: String
        }],
        required: false
    }
})

module.exports = model('Session', schema)