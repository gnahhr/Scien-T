const express = require('express');
const router = express.Router();
const UserData = require('../models/UsersModel')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

//post user prog mixing table
exports.mixElements = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.body.access
    const _id = new ObjectId (access)
    

    const mixed = req.body.element
    console.log(mixed)

    const compoundElement = await UserData.findByIdAndUpdate({_id},{
        $push: {mixingElements: mixed}
    })

    if(compoundElement){
        return res.json({ status: 'ok', user: token })
    }
    else{
        return res.json({ status: 'error', error: 'Invalid access token' })
    }
}

//get user prog mixing table
exports.getME = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.header['token']
    const _id = new ObjectId (access)

    const userProg = await UserData.findById({_id})
    
    if(userProg)
        return res.json({userProg})
    
    else
        return res.json({ status: 'error', error: 'Invalid access token' })
}

exports.electronConfiguration = async (req, res, next) => {
    res.json('aadfasdf')
}

exports.intelliment = async (req, res, next) => {
    res.json('aadfasdf')
}

