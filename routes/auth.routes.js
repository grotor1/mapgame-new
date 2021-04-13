const {Router} = require('express')
const config = require('config')
const Session = require('../models/Session')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const InitialState = require('../models/initialState')
const InitialStateRussia = require("../models/initialStateRussia")
const router = Router()


router.post('/register',
    [
        check('sessionCode', 'Введите код сессии').exists().isNumeric(),
        check('adminPassword', 'Введите пароль администратора').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при регистрации"
                })
            }
            const {sessionCode, adminPassword, sessionType} = req.body;
            console.log(sessionType+ " dsfsdf ")
            const candidate = await Session.findOne({sessionCode})
            if (candidate) {
                return res.status(400).json({message: "Такой код уже занят"})
            }
            if (adminPassword !== config.get('adminPassword')) {
                return res.status(400).json({message: "Неправильный пароль администратора"})
            }
            let session
            if (sessionType === "Russia") {
                console.log("ok")
                session = new Session({
                    sessionCode,
                    sessionDataRussia: InitialStateRussia,
                    sessionTimer: 300,
                    sessionType
                })
            } else {
                session = new Session({sessionCode, sessionDataUsa: InitialState, sessionTimer: 300, sessionType})
            }
            await session.save()
            res.status(201).json({message: "Новая сессия создана"})
        } catch (e) {
            res.status(500).json({message: "Что-то не так", error: e})
        }
    })

router.post('/login',
    [
        check('sessionCode', 'Введите код сессии').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при регистрации"
                })
            }
            const {sessionCode, adminPassword, isAdmin} = req.body;
            const session = await Session.findOne({sessionCode})
            console.log(session)
            if (!session) {
                return res.status(400).json({message: 'Сессия не обнаружена'})
            }
            const token = jwt.sign(
                {_id_session: session._id},
                config.get('jwtSecret'),
                {expiresIn: "1h"}
            )
            if (isAdmin && adminPassword === config.get('adminPassword')) res.json({
                token,
                _id_session: session._id,
                isAdmin: true,
                sessionType: session.sessionType
            })
            else if (isAdmin && adminPassword !== config.get('adminPassword')) res.status(400).json({message: "Неверный пароль администратора"})
            else res.json({
                    token, _id_session: session._id,
                    isAdmin: false,
                    sessionType: session.sessionType
                })
        } catch (e) {
            res.status(500).json({message: "Что-то не так"})
        }
    })

module.exports = router