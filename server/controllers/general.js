const express = require('express');
const router = express.Router();
const UserData = require('../models/UsersModel')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

//post user prog mixing table
exports.mixElements = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.body.access
    const _id = new ObjectId (access)
    

    const mixed = req.body.element
    console.log(mixed)

    const pushProg = await UserData.findByIdAndUpdate({_id},{
        $push: {mixingElements: mixed}
    })

    if(pushProg){
        return res.json({ status: 'ok'})
    }
    else{
        return res.json({ status: 'error', error: 'Invalid access token' })
    }
}

//get user prog mixing table
exports.getME = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const userProg = await UserData.findById({_id}, {mixingElements:1})
    
    if(userProg)
        return res.json({status:'ok', userProg: userProg})
    else
        return res.json({ status: 'error', error: 'Invalid access token' })
}

exports.electronConfiguration = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.body.access
    const _id = new ObjectId (access)

    const atomicNumber = req.body.atomicNumber
    const points = req.body.points
    
    const pushProg = await UserData.findByIdAndUpdate({_id},{
        $inc: {"electronConfiguration.points": points},
        $push: {"electronConfiguration.atomicNumber": atomicNumber}
    })

    if(pushProg)
        res.json({status: 'ok'})
    
    else
        return res.json({ status: 'error', error: 'Invalid access token' })
    


}

exports.getEC = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const userProg = await UserData.findById({_id}, {"electronConfiguration.atomicNumber":1})
    
    if(userProg)
        return res.json({status:'ok', userProg: userProg})
    else
        return res.json({ status: 'error', error: 'Invalid access token' })
}

exports.intelliment = async (req, res, next) => {
    res.json('aadfasdf')
}


// const pushProgPoints = await UserData.findByIdAndUpdate({_id},{
//     $inc: {electronConfigPoints: points}
// })

// const pushProgAtomicNumber = await UserData.findByIdAndUpdate({_id},{
//     $push: {electronConfigAtomicNumber: atomicNumber}
// })

// if(pushProgPoints && pushProgAtomicNumber )
//     res.json(pushProgAtomicNumber)