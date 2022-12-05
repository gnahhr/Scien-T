const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

//utils
const { generateOTP, mailTransport } = require('../utils/mail')


//schemas
const UserData = require('../models/UsersModel')
const VerificationToken = require('../models/VerificationToken')
const ChangePasswordToken = require('../models/ChangePasswordToken')
const { isValidObjectId } = require('mongoose');

var ObjectId = require('mongoose').Types.ObjectId;


//register
exports.register = async (req, res, next) => {
	const { firstName, lastName, gender, email, username, password: plainTextPassword } = req.body

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await UserData.create({
            firstName, 
            lastName,
			gender, 
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
			html: `<h1> ${OTP} </h1>`//mamaya gagawin

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
	try {
		const token = req.body.access
		const holder = req.body.OTP
		const otp = holder.join('')
		const _id = new ObjectId (token)

		console.log(otp)

		

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
	} catch (error) {
		return res.json({status:'error', error: 'Something went wrong. Please try again later.'})
		throw error
	}
}

//login
exports.login = async (req, res, next) => {
	const { username, password } = req.body

	const user = await UserData.findOne({ username })

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid Username' })
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
			const token = jwt.sign(
				{
					id: user._id,
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					gender: user.gender,
					email: user.email
				},
				JWT_SECRET
			)
			return res.json({ status: 'ok', user: token })
		}
	}
	else{
		res.json({ status: 'error', error: 'Wrong Password'})
	}
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
	
	const token = req.body.access
	const _id = new ObjectId (token)

	const plainTextPassword = req.body.password

	const password = await bcrypt.hash(plainTextPassword, 10)

	const user = await UserData.findByIdAndUpdate({_id},{
		$set:{password: password}
	})

	if(user){

		await ChangePasswordToken.findOneAndDelete({owner:user._id})
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


exports.editUser = async (req, res, next) => {
	
	const token = req.params['access']
	const _id = new ObjectId (token)
	const { username, firstName, lastName, email } = req.body
	

	try {
		const user = await UserData.findByIdAndUpdate({_id},{
			$set:{
				username: username,
				firstName: firstName,
				lastName: lastName,
				email: email
			}
		},{upsert: true})

		if(user){
			const getUser = await UserData.findById({_id})
			const token = jwt.sign(
				{
					id: getUser._id,
					username: getUser.username,
					firstName: getUser.firstName,
					lastName: getUser.lastName,
					gender: getUser.gender,
					email: getUser.email
				},
				JWT_SECRET 
			)

			res.json({status: 'ok', user: token})
		}
	} catch (error) {
		if (error.code === 11000) {
			return res.json({ status: 'error', error: 'Username/Email already in use' })
		}
		throw error
	}
}

exports.findUser = async (req, res, next) => {
	const email = req.body.email

	const user = await UserData.findOne({email},{username:1})

	if(user){
		res.json({status:'ok', user: user.username})
	}
	else{
		res.json({status:'error', error:'User Not Found'})
	}
}