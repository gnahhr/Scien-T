const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const UserData = require('../models/UsersModel')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

router.post('/api/register', async (req,res) => {
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
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })

})

router.post('/api/login', async (req,res) => {
    const { username, password } = req.body
	const user = await UserData.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
                firstName: user.firstName,
			},
			JWT_SECRET
		)
        console.log(token.username)
		return res.json({ status: 'ok', token: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})


module.exports = router;