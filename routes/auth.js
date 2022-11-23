const express = require ('express')
const router = express.Router()

const { register, verify, login, requestOTP, verifyRequestOTP, changePassword, editUser, findUser } = require ('../controllers/auth')

//Routes for user verification
router.route('/register').post(register)
router.route('/verify').post(verify)
router.route('/login').post(login)
router.route('/requestOTP/:username').get(requestOTP)
router.route('/verifyRequestOTP').post(verifyRequestOTP)
router.route('/changePassword').post(changePassword)
router.route('/editUser/:access').post(editUser)
router.route('/findUser').post(findUser)
module.exports = router