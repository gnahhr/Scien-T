const express = require('express');
const router = express.Router();
const UserData = require('../models/UsersModel')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

router.post('/api/mixElements', async (req,res) =>{ //save user's progress
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.body.access
    const _id = new ObjectId (access)
    

    const mixed = req.body.element
    console.log(mixed)

    const compoundElement = await UserData.findByIdAndUpdate({_id},{
        $push: {mixingElements: mixed}
    })

    if(compoundElement){
        const user = await UserData.findById({_id})
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mixingElements: user.mixingElements,
                electronConfiguration: user.electronConfiguration,
                intelliment: user.intelliment
            },
            JWT_SECRET
        )
        return res.json({ status: 'ok', user: token })
    }
    else{
        return res.json({ status: 'error', error: 'Invalid access token' })
    }

})

router.get('api/mixElements', async (req, res) => {

})

router.post('api/electronConfiguration', async (req,res) => {

})

router.get('api/electronConfiguration', async (req,res) => {
    
})



module.exports = router
