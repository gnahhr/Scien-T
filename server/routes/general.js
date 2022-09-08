const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const UserData = require('../models/UsersModel')

module.exports = router

router.post('/api/save', async (req,res) =>{ //save user's progress
    //mema muna
})

router