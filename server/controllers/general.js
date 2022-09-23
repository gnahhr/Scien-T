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
            $inc: {points: score}
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
            $inc: {points: score}
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
            $inc: {points: score}
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
            $inc: {points: score}
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

exports.rankings = async (req, res, next) => {//rankings for intelliment || will modify later
    // const category = req.body.category
    // const getRankings = await UserData.find({},{username: 1, intelliment: 1}).sort({intelliment: -1})

    // if(getRankings)
    //     res.json({status:'ok', rankings: getRankings})

    // else
    //     res.json({status:'error', erro:'error'})
}

exports.getElectronConfigRankings = async (req, res, next) => {
    const getRankings = await ElectronConfigRankings.find({}, {username: 1, points: 1}).sort({points: -1})

    if(getRankings)
        res.json({status:'ok', rankings: getRankings})

    else
        res.json({status:'error', erro:'error'})
}




// const pushProgPoints = await UserData.findByIdAndUpdate({_id},{
//     $inc: {electronConfigPoints: points}
// })

// const pushProgAtomicNumber = await UserData.findByIdAndUpdate({_id},{
//     $push: {electronConfigAtomicNumber: atomicNumber}
// })

// if(pushProgPoints && pushProgAtomicNumber )
//     res.json(pushProgAtomicNumber)