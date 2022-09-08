const express = require('express');
const router = express.Router();
const UserData = require('../models/UsersModel')

router.post('/api/mixElements', async (req,res) =>{ //save user's progress
    console.log('adfadfdafdsf')
    const mixed = req.body.element
    console.log(mixed)

    const compoundElement = await UserData.updateOne({
        username: req.body.username
        },{
            $push: {mixingElements: mixed}}
    )
})

module.exports = router
