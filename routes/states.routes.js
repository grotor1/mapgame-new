const {Router} = require('express')
const Session = require('../models/Session')
const InitialState = require('../models/initialState')

const router = Router()

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Session.findById(id, (err, session) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, data: session.sessionData});
    });
});

router.put('/:id/:blockId', (req, res) => {
    const {id, blockId} = req.params;
    if (!blockId) {
        return res.json({success: false, error: 'No comment id provided'});
    }
    Session.findById(id, (err, session) => {
        const index = parseInt(blockId.slice(6)) - 1;
        const {rOwner, vOwner} = req.body;
        session.sessionData[index].resourceOwner = rOwner;
        session.sessionData[index].voteOwner = vOwner;
        if (err) return res.json({success: false, err});
        session.save(err => {
            if (err) return res.json({success: false, err});
            return res.json({success: true});
        });
    });
});

module.exports = router