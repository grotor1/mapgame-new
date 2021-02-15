const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    sessionCode: {
        type: Number,
        required: true,
        unique: true
    },
    sessionData: {
        type: [{
            resourceOwner: String,
            voteOwner: String,
            state1: String,
            state2: String,
            block: String,
            task: String,
            resources: String
        }],
        required: true
    }
})

module.exports = model('Session', schema)