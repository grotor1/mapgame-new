const {Router} = require('express')
const Session = require('../models/Session')
const InitialState = require('../models/initialState')

const router = Router()

router.get('/russia/:id', (req, res) => {
    const {id} = req.params;
    console.log(89)
    Session.findById(id, (err, session) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, data: session.sessionDataRussia});
    });
});

router.get('/usa/:id', (req, res) => {
    const {id} = req.params;
    Session.findById(id, (err, session) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, data: session.sessionDataUsa});
    });
});

router.get('/timerGet/:id', (req, res) => {
    const {id} = req.params;
    Session.findById(id, (err, session) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, data: session.sessionTimer});
    });
});

router.put('/timerPut/:id', (req, res) => {
    const {id} = req.params;
    Session.findById(id, (err, session) => {
        const {sessionTimer} = req.body;
        session.sessionTimer = sessionTimer
        if (err) return res.json({success: false, err});
        session.save(err => {
            if (err) return res.json({success: false, err});
            return res.json({success: true});
        });
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
        if(session.sessionType === "Russia") {
            session.sessionDataRussia[index].resourceOwner = rOwner;
            session.sessionDataRussia[index].voteOwner = vOwner;
        } else {
            session.sessionDataUsa[index].resourceOwner = rOwner;
            session.sessionDataUsa[index].voteOwner = vOwner;
        }
        if (err) return res.json({success: false, err});
        session.save(err => {
            if (err) return res.json({success: false, err});
            return res.json({success: true});
        });
    });
});

module.exports = router