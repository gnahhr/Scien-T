const express = require('express');
const router = express.Router();
const UserData = require('../models/UsersModel')
const ElectronConfigRankings = require('../models/ElectronConfigRankings')
const IntellimentEasyRankings = require('../models/IntellimentEasyRankings')
const IntellimentNormalRankings = require('../models/IntellimentNormalRankings')
const IntellimentHardRankings = require('../models/IntellimentHardRankings')
const IntellimentHardcoreRankings = require('../models/IntellimentHardcoreRankings')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

//post user prog mixing table
exports.mixElements = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.body.access;
    const _id = new ObjectId (access);
    const mixed = req.body.element;

    // const pushProg = await UserData.findOneAndUpdate({username: "josh"},{
    //     $push: {mixingElements: {$each: [...mixed]}}
    // })
    const pushProg = await UserData.findByIdAndUpdate({_id},{
        $push: {mixingElements: {$each: [...mixed]}}
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
    const username = req.body.username

    const atomicNumber = req.body.atomicNumber
    const points = req.body.points
    
    const pushProg = await UserData.findByIdAndUpdate({_id},{
        $push: {atomicNumberEC: atomicNumber}
    })

    const pushProgPoints = await UserData.findByIdAndUpdate({_id},{
        $inc: {pointsEC: points}
    })

    const pushRankings = await ElectronConfigRankings.findOneAndUpdate({username},{
        $inc: {points : points}
    }, {upsert: true})
    
    if(pushProg)
        res.json({status: 'ok', pushRankings})
    
    else
        return res.json({ status: 'error', error: 'Invalid access token' })
    


}

exports.getEC = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const userProg = await UserData.findById({_id}, {atomicNumberEC:1})
    
    if(userProg)
        return res.json({status:'ok', userProg: userProg})
    else
        return res.json({ status: 'error', error: 'Invalid access token' })
}

exports.intelliment = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.body.access
    const _id = new ObjectId (access)

    const score = req.body.score
    const category = req.body.category
    const username = req.body.username

    if(category == 30){
        const pushRankings = await IntellimentEasyRankings.findOneAndUpdate({username},{
            $max: {points: score}
        }, {upsert: true})

        const pushProg = await UserData.findByIdAndUpdate({_id},{
            $push: {intellimentEasy: score}
        })

        const highScore = await UserData.findOneAndUpdate({username}, {
            $max: { intellimentEasyHS: score} 
        })

        if(pushProg)
        res.json({status: 'ok', pushRankings})
    
        else
            return res.json({ status: 'error', error: 'Invalid access token' })
    }

    else if(category == 60){
        const pushRankings = await IntellimentNormalRankings.findOneAndUpdate({username},{
            $max: {points: score}
        }, {upsert: true})

        const pushProg = await UserData.findByIdAndUpdate({_id},{
            $push: {intellimentNormal: score}
        })

        const highScore = await UserData.findOneAndUpdate({username}, {
            $max: { intellimentNormalHS: score} 
        })

        if(pushProg)
        res.json({status: 'ok', pushRankings})
    
        else
            return res.json({ status: 'error', error: 'Invalid access token' })
    }

    else if(category == 90){
        const pushRankings = await IntellimentHardRankings.findOneAndUpdate({username},{
            $max: {points: score}
        }, {upsert: true})

        const pushProg = await UserData.findByIdAndUpdate({_id},{
            $push: {intellimentHard: score}
        })

        const highScore = await UserData.findOneAndUpdate({username}, {
            $max: { intellimentHardHS: score} 
        })

        if(pushProg)
        res.json({status: 'ok', pushRankings})
    
        else
            return res.json({ status: 'error', error: 'Invalid access token' })
    }

    else if(category == 118){
        const pushRankings = await IntellimentHardcoreRankings.findOneAndUpdate({username},{
            $max: {points: score}
        }, {upsert: true})

        const pushProg = await UserData.findByIdAndUpdate({_id},{
            $push: {intellimentHardcore: score}
        })

        const highScore = await UserData.findOneAndUpdate({username}, {
            $max: { intellimentHardcoreHS: score} 
        })

        if(pushProg)
        res.json({status: 'ok', pushRankings})
    
        else
            return res.json({ status: 'error', error: 'Invalid access token' })
    }

    else{
        return res.json({status: category})
    }

}

exports.getIntellimentRankings = async (req, res, next) => {//rankings for intelliment || will modify later
    const category = req.params['difficulty']

    if(category === "easy"){
        const getRankings = await IntellimentEasyRankings.find({}, {username: 1, points: 1}).sort({points: -1})

        if(getRankings)
            res.json({status:'ok', rankings: getRankings})

        else
            res.json({status:'error', error:'error'})
    }

    else if(category === "normal"){
        const getRankings = await IntellimentNormalRankings.find({}, {username: 1, points: 1}).sort({points: -1})

        if(getRankings)
            res.json({status:'ok', rankings: getRankings})

        else
            res.json({status:'error', error:'error'})
    }

    else if(category === "hard"){
        const getRankings = await IntellimentHardRankings.find({}, {username: 1, points: 1}).sort({points: -1})
        
        if(getRankings)
            res.json({status:'ok', rankings: getRankings})

        else
            res.json({status:'error', error:'error'})
    }

    else if(category === "hardcore"){
        const getRankings = await IntellimentHardcoreRankings.find({}, {username: 1, points: 1}).sort({points: -1})
        
        if(getRankings)
            res.json({status:'ok', rankings: getRankings})

        else
            res.json({status:'error', error:'error'})
    }

}

exports.getElectronConfigRankings = async (req, res, next) => {
    const getRankings = await ElectronConfigRankings.find({}, {username: 1, points: 1}).sort({points: -1})

    if(getRankings)
        res.json({status:'ok', rankings: getRankings})

    else
        res.json({status:'error', error:'error'})
}

exports.getIntellimentData = async(req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const difficulty = req.params['difficulty']

    if(difficulty === "easy"){
        const data = await UserData.findById({_id},{intellimentEasy:1})
        res.json({data: data.intellimentEasy})
    }

    else if(difficulty === "normal"){
        const data = await UserData.findById({_id},{intellimentNormal:1})
        res.json({data: data.intellimentNormal})
    }

    else if(difficulty === "hard"){
        const data = await UserData.findById({_id},{intellimentHard:1})
        res.json({data: data.intellimentHard})
    }

    else if(difficulty === "hardcore"){
        const data = await UserData.findById({_id},{intellimentHardcore:1})
        res.json({data: data.intellimentHardcore})
    }
    // const data = await UserData.findById({_id},{intellimentEasy:1})
    // console.log(data)
    // res.json({data: data.intellimentEasy})
}



// const pushProgPoints = await UserData.findByIdAndUpdate({_id},{
//     $inc: {electronConfigPoints: points}
// })

// const pushProgAtomicNumber = await UserData.findByIdAndUpdate({_id},{
//     $push: {electronConfigAtomicNumber: atomicNumber}
// })

// if(pushProgPoints && pushProgAtomicNumber )
//     res.json(pushProgAtomicNumber)