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

//verify
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
		if(!verify) res.json({status: 'error', error: 'token not found'})

		const isMatch = await bcrypt.compare(otp, verify.token)
		if(!isMatch) res.json({status: 'error', error: 'wrong OTP'})

		else{
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
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (await bcrypt.compare(password, user.password)) {

		if(!user.isVerified){
			console.log('asdfasdf')
			const OTP = generateOTP()
			console.log(OTP)
			const hashOTP = await bcrypt.hash(OTP, 10)

			const verificationToken = await VerificationToken.updateOne({ owner: user._id },{
				$set: {
					owner: user._id,
					token: hashOTP
				}},{ upsert: true })

			console.log(verificationToken)

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

			return res.json({ status: 'verify user', user: token })
			
		}

		else{
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
		res.json({ status: 'error', error: 'wrong password' })
	}
}
