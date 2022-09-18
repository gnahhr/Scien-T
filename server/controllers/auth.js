const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

//utils
const { generateOTP, mailTransport } = require('../utils/mail')


//schemas
const UserData = require('../models/UsersModel')
const VerificationToken = require('../models/VerificationToken');
const { isValidObjectId } = require('mongoose');


//register
exports.register = async (req, res, next) => {
	const { firstName, lastName, email, username, password: plainTextPassword } = req.body

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await UserData.create({
            firstName, 
            lastName, 
            email,
			username,
			password
		})

		const OTP = generateOTP()
		const hashOTP = await bcrypt.hash(OTP, 10)

		const verificationToken = await VerificationToken.create({
			owner: response._id,
			token: hashOTP
		})

		mailTransport().sendMail({
			from: 'shenxaioting@gmail.com',
			to: response.email,
			subject: 'verify email',
			html: `<h1> ${OTP} </h1>`

		})

		const token = jwt.sign(
			{
				id: response._id,
			},
			JWT_SECRET
		)
		return res.json({ status: 'ok', user: token })

	} catch (error) {
		if (error.code === 11000) {
			return res.json({ status: 'error', error: 'Username/Email already in use' })
		}
		throw error
	}
}

//verify
exports.verify = async (req, res, next) => {
	var ObjectId = require('mongoose').Types.ObjectId;


	
	const token = req.body.access
	const otp = req.body.OTP
	const _id = new ObjectId (token)

	if(!isValidObjectId(_id)) res.json({status: 'error', error: 'invalid user id'})

	const user = await UserData.findById({_id})
	if(!user) res.json({status: 'error', error: 'User not found'})
	
	if(user.isVerified){
		res.json({status: 'error', error: 'user already verified'})
	}

	const verify = await VerificationToken.findOne({owner: _id})			
	if(!verify) res.json({status: 'error', error: 'token not found'})

	const isMatch = await bcrypt.compare(otp, verify.token)
	if(!isMatch) res.json({status: 'error', error: 'wrong token'})

	user.isVerified = true

	await VerificationToken.findByIdAndDelete(verify._id)
	user.save()

	mailTransport().sendMail({
		from: 'shenxaioting@gmail.com',
		to: user.email,
		subject: 'verify email',
		html: `<h1> you are now verified </h1>`

	})
	res.json({status:'ok'})
}

//login
exports.login = async (req, res, next) => {
	const { username, password } = req.body
	const user = await UserData.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
                firstName: user.firstName,
				lastName: user.lastName,
				email: user.email
			},
			JWT_SECRET
		)
		return res.json({ status: 'ok', user: token })
	}

	else{
		res.json({ status: 'error', user: false })
	}
}
