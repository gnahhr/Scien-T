const express = require ('express')
const router = express.Router()

const { register, verify, login, getFailedAttempts, requestOTP, verifyRequestOTP, changePassword, getRemainingTime, editUser, findUser } = require ('../controllers/auth')

//Routes for user verification
router.route('/register').post(register)
router.route('/verify').post(verify)
router.route('/login').post(login)
router.route('/failedAttempts/:username').get(getFailedAttempts)
router.route('/requestOTP/:username').get(requestOTP)
router.route('/verifyRequestOTP').post(verifyRequestOTP)
router.route('/changePassword').post(changePassword)
router.route('/getRemainingTime/:username').get(getRemainingTime)
router.route('/editUser/:access').post(editUser)
router.route('/findUser').post(findUser)
module.exports = router