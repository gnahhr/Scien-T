const express = require('express');
const router = express.Router();
const UserData = require('../models/UsersModel')

router.post('/register', async (req,res) => {
    res.json(req.body)
})



module.exports = router;