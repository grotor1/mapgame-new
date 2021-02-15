const {Router} = require('express')
const config = require('config')
const Session = require('../models/Session')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const InitialState = require('../models/initialState')
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
            const {sessionCode, adminPassword} = req.body;
            const candidate = await Session.findOne({sessionCode})
            if (candidate) {
                return res.status(400).json({message: "Такой код уже занят"})
            }
            if (adminPassword !== config.get('adminPassword')) {
                return res.status(400).json({message: "Неправильный пароль администратора"})
            }
            const session = new Session({sessionCode, sessionData: InitialState})
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
            if (!session) {
                return res.status(400).json({message: 'Сессия не обнаружена'})
            }
            const token = jwt.sign(
                {_id_session: session._id},
                config.get('jwtSecret'),
                {expiresIn: "1h"}
            )
            if (isAdmin && adminPassword === config.get('adminPassword')) res.json({token, _id_session: session._id, isAdmin: true})
            else if (isAdmin && adminPassword !== config.get('adminPassword')) res.status(400).json({message: "Неверный пароль администратора"})
            else res.json({token, _id_session: session._id, isAdmin: false})
        } catch (e) {
            res.status(500).json({message: "Что-то не так"})
        }
    })

module.exports = router