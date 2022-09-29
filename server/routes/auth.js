const express = require ('express')
const router = express.Router()

const { register, verify, login } = require ('../controllers/auth')

//Routes for user verification
router.route('/register').post(register)
router.route('/verify').post(verify)
router.route('/login').post(login)

module.exports = router