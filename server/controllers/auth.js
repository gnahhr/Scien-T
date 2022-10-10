const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

//utils
const { generateOTP, mailTransport } = require('../utils/mail')


//schemas
const UserData = require('../models/UsersModel')
const VerificationToken = require('../models/VerificationToken')
const FailedAttempts = require('../models/FailedAttempts')
const ChangePasswordToken = require('../models/ChangePasswordToken')
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
			from: process.env.MAIL_USERNAME_APP,
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

//verify user
exports.verify = async (req, res, next) => {
	var ObjectId = require('mongoose').Types.ObjectId;

	const token = req.body.access
	const holder = req.body.OTP
	const otp = holder.join('')
	const _id = new ObjectId (token)

	console.log(otp)

	if(!isValidObjectId(_id)) res.json({status: 'error', error: 'invalid user id'})

	const user = await UserData.findById({_id})
	
	if(!user.isVerified){
		const verify = await VerificationToken.findOne({owner: _id})			
		if(!verify) {
			res.json({status: 'error', error: 'token not found'})
		}

		const isMatch = await bcrypt.compare(otp, verify.token)
		
		if(!isMatch) {
			res.json({status: 'error', error: 'wrong OTP'})
		}

		else{
			user.isVerified = true

			await VerificationToken.findByIdAndDelete(verify._id)
			user.save()

			mailTransport().sendMail({
				from: process.env.MAIL_USERNAME_APP,
				to: user.email,
				subject: 'verify email',
				html: `<h1> you are now verified </h1>`

			})
			res.json({status:'ok'})
		}
	}
	else{
		res.json({status: 'user already verified', error: 'user already verified'})
	}
}

//login
exports.login = async (req, res, next) => {
	const { username, password } = req.body

	const user = await UserData.findOne({ username })

	if (!user) {
		return res.json({ status: 'Invalid Username', error: 'Invalid Username' })
	}

	if (await bcrypt.compare(password, user.password)) {

		if(!user.isVerified){
			const OTP = generateOTP()
			console.log(OTP)
			const hashOTP = await bcrypt.hash(OTP, 10)

			const verificationToken = await VerificationToken.updateOne({ owner: user._id },{
				$set: {
					owner: user._id,
					token: hashOTP
				}},{ upsert: true })

			

			mailTransport().sendMail({
				from: process.env.MAIL_USERNAME_APP,
				to: user.email,
				subject: 'verify email',
				html: `<h1> ${OTP} </h1>`
		
			})
		
			const token = jwt.sign(
				{
					id: user._id,
				},
				JWT_SECRET
			)

			return res.json({ status: 'Verify User', user: token })
			
		}

		else{
			const resetFailedAttemptCounter = await FailedAttempts.findOneAndDelete({owner: user._id})
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
	}

	else{
		const incrementCounter = await FailedAttempts.findOneAndUpdate({username},{
			$inc: {counter: 1}
		},{upsert: true})

		res.json({ status: 'Wrong Password', error: 'Wrong Password'})
	}
}



exports.getFailedAttempts = async (req, res, next) => {
	const username = req.params['username']

	const counter = await FailedAttempts.findOne({username}, {counter: 1})
	
	return res.json({counter: counter})
}

exports.requestOTP = async (req, res, next) => {
	const username = req.params['username']

	const user = await UserData.findOne({ username })

	const OTP = generateOTP()
	console.log(OTP)
	const hashOTP = await bcrypt.hash(OTP, 10)

	const changePasswordToken = await ChangePasswordToken.updateOne({ owner: user._id },{
		$set: {
			owner: user._id,
			token: hashOTP
		}},{ upsert: true })

	

	mailTransport().sendMail({
		from: process.env.MAIL_USERNAME_APP,
		to: user.email,
		subject: 'Request Change Password',
		html: `<h1> ${OTP} </h1>`
		
	})
		
	const token = jwt.sign(
		{
			id: user._id,
		},
		JWT_SECRET
	)

	return res.json({ status: 'Verify User', user: token })
}

exports.verifyRequestOTP = async (req, res, next) => {
	var ObjectId = require('mongoose').Types.ObjectId;

	const token = req.body.access
	const holder = req.body.OTP
	const otp = holder.join('')
	const _id = new ObjectId (token)

	const user = await UserData.findById({_id})

	if(!isValidObjectId(_id)) res.json({status: 'error', error: 'invalid user id'})

	const verify = await ChangePasswordToken.findOne({owner: _id})			
	if(!verify) {
		res.json({status: 'error', error: 'token not found'})
	}

	const isMatch = await bcrypt.compare(otp, verify.token)
		
	if(!isMatch) {
		res.json({status: 'error', error: 'wrong OTP'})
	}

	else{
		
		res.json({status:'ok'})
	}
}

exports.changePassword = async (req, res, next) =>{
	var ObjectId = require('mongoose').Types.ObjectId;
	const token = req.body.access
	const _id = new ObjectId (token)

	const plainTextPassword = req.body.password

	const password = await bcrypt.hash(plainTextPassword, 10)

	const user = await UserData.findByIdAndUpdate({_id},{
		$set:{password: password}
	})

	if(user){

		await ChangePasswordToken.findOneAndDelete({owner:user._id})
		await FailedAttempts.findOneAndDelete({username: user.username})
		mailTransport().sendMail({
			from: process.env.MAIL_USERNAME_APP,
			to: user.email,
			subject: 'Change Passwrod',
			html: `<h1> you have successfully changed your password </h1>`
		})
		res.json({status: 'ok'})
	}

	else{
		res.json({status: 'error', error: 'User Does Not Exist'})
	}
}