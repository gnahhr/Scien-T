const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');

const UserData = require('../models/UsersModel')
const ElectronConfigRankings = require('../models/ElectronConfigRankings')
const IntellimentEasyRankings = require('../models/IntellimentEasyRankings')
const IntellimentNormalRankings = require('../models/IntellimentNormalRankings')
const IntellimentHardRankings = require('../models/IntellimentHardRankings')
const IntellimentHardcoreRankings = require('../models/IntellimentHardcoreRankings')
const BattleAtomicMassEndlessRankings = require('../models/BattleAtomicMassEndlessRankings')
const BattleAtomicNumberEndlessRankings = require('../models/BattleAtomicNumberEndlessRankings')
const BattleCategoryEndlessRankings = require('../models/BattleCategoryEndlessRankings')
const BattleElementNameEndlessRankings = require('../models/BattleElementNameEndlessRankings')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

//post user prog mixing table
exports.mixElements = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.body.access;
    const _id = new ObjectId (access);
    const mixed = req.body.element;
    
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

exports.intelliment = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.body.access
    const _id = new ObjectId (access)

    const score = req.body.score
    const category = req.body.category
    const username = req.body.username
    const corAve = req.body.corAve

    if(category == 30){
        const pushRankings = await IntellimentEasyRankings.findOneAndUpdate({username},{
            $max: {points: score}
        }, {upsert: true})

        const pushProg = await UserData.findByIdAndUpdate({_id},{
            $push: {intellimentEasy: score, intellimentEasyCounter: corAve},
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
            $push: {intellimentNormal: score, intellimentNormalCounter: corAve},
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
            $push: {intellimentHard: score, intellimentHardCounter: corAve},
            $max: { intellimentHardHS: score}
        })

        // const highScore = await UserData.findOneAndUpdate({username}, {
        //     $max: { intellimentHardHS: score} 
        // })

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
            $push: {intellimentHardcore: score, intellimentHardcoreCounter: corAve},
            $max: {intellimentHardcoreHS: score} 
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
}

exports.getIntellimentCounter = async(req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const difficulty = req.params['difficulty']

    if(difficulty === "easy"){
        const data = await UserData.findById({_id},{intellimentEasyCounter:1})
        res.json({data: data.intellimentEasyCounter})
    }

    else if(difficulty === "normal"){
        const data = await UserData.findById({_id},{intellimentNormalCounter:1})
        res.json({data: data.intellimentNormalCounter})
    }

    else if(difficulty === "hard"){
        const data = await UserData.findById({_id},{intellimentHardCounter:1})
        res.json({data: data.intellimentHardCounter})
    }

    else if(difficulty === "hardcore"){
        const data = await UserData.findById({_id},{intellimentHardcoreCounter:1})
        res.json({data: data.intellimentHardcoreCounter})
    }
}

exports.electronConfiguration = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.body.access
    const _id = new ObjectId (access)
    const username = req.body.username

    const points = req.body.points
    const prizeCoins = req.body.prizeCoins

    const pushProgPoints = await UserData.findByIdAndUpdate({_id},{
        $inc: {pointsEC: points, coins: prizeCoins}
    })

    const pushRankings = await ElectronConfigRankings.findOneAndUpdate({username},{
        $inc: {points : points}
    }, {upsert: true})
    
    if(pushProgPoints)
        res.json({status: 'ok', pushRankings})
    
    else
        return res.json({ status: 'error', error: 'Invalid access token' })
    
}

exports.getEC = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const userProg = await UserData.findById({_id}, {pointsEC:1})
    
    if(userProg)
        return res.json({status:'ok', userProg: userProg})
    else
        return res.json({ status: 'error', error: 'Invalid access token' })
}

exports.testBattle = async (req, res, next)  =>{
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const username = req.params['username']
    const topic = req.params['topic']
    const stage = req.params['stage']

    const score = req.body.score
    const prizeCoins = req.body.prizeCoins

    if(topic === 'elemName'){
        if(stage === 'endless'){
            const pushProg = await UserData.findByIdAndUpdate({_id},{
                $max: {battleElementNameEndlessHS: score}
            })

            const pushRankings = await BattleElementNameEndlessRankings.findOneAndUpdate({username},{
                $max: {points: score}
            },{upsert: true})
        }

        const pushCoins = await UserData.findByIdAndUpdate({_id},{
            $inc:{coins: prizeCoins}
        })
        res.json({status:'ok'})
    }

    else if(topic === 'atomicNum'){
        if(stage === 'endless'){
            const pushProg = await UserData.findByIdAndUpdate({_id},{
                $max: {battleAtomicNumberEndlessHS: score}
            })

            const pushRankings = await BattleAtomicNumberEndlessRankings.findOneAndUpdate({username},{
                $max: {points: score}
            },{upsert: true})
        }
        
        const pushCoins = await UserData.findByIdAndUpdate({_id},{
            $inc:{coins: prizeCoins}
        })
        res.json({status:'ok'})
    }

    else if(topic === 'atomicMass'){
        if(stage === 'endless'){
            const pushProg = await UserData.findByIdAndUpdate({_id},{
                $max: {battleAtomicMassEndlessHS: score}
            })

            const pushRankings = await BattleAtomicMassEndlessRankings.findOneAndUpdate({username},{
                $max: {points: score}
            },{upsert: true})
        }

        const pushCoins = await UserData.findByIdAndUpdate({_id},{
            $inc:{coins: prizeCoins}
        })
        res.json({status:'ok'})
    }

    else if(topic === 'category'){
        if(stage === 'endless'){
            const pushProg = await UserData.findByIdAndUpdate({_id},{
                $max: {battleCategoryEndlessHS: score}
            })

            const pushRankings = await BattleCategoryEndlessRankings.findOneAndUpdate({username},{
                $max: {points: score}
            },{upsert: true})
        }

        const pushCoins = await UserData.findByIdAndUpdate({_id},{
            $inc:{coins: prizeCoins}
        })
        res.json({status:'ok'})
    }
}

exports.buyTestBattleStage = async(req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const topic = req.params['topic']
    const stagePrice = req.body.stagePrice
    

    if(topic === 'elemName'){
        const buyStage = await UserData.findByIdAndUpdate({_id},{
            $inc:{battleElementName:1, coins: -(stagePrice)}
        })

        res.json({status:'ok'})
    }

    else if(topic === 'atomicNum'){
        const buyStage = await UserData.findByIdAndUpdate({_id},{
            $inc:{battleAtomicNumber:1, coins: -(price)}
        })
        
        res.json({status:'ok'})
    }

    else if(topic === 'atomicMass'){
        const buyStage = await UserData.findByIdAndUpdate({_id},{
            $inc:{battleAtomicMass:1, coins: -(price)}
        })
        
        res.json({status:'ok'})
    }

    else if(topic === 'category'){
        const buyStage = await UserData.findByIdAndUpdate({_id},{
            $inc:{battleCategory:1, coins: -(price)}
        })
        
        res.json({status:'ok'})
    }
}

exports.getUserProgTestBattle = async (req, res, next)  =>{
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const topic = req.params['topic']

    if(topic === 'elemName'){
        const data = await UserData.findById({_id}, {battleElementName:1})
        res.json({data: data.battleElementName})
    }

    else if(topic === 'atomicNum'){
        const data = await UserData.findById({_id}, {battleAtomicNumber:1})
        res.json({data: data.battleAtomicNumber})
    }

    else if(topic === 'atomicMass'){
        const data = await UserData.findById({_id}, {battleAtomicMass:1})
        res.json({data: data.battleAtomicMass})
    }

    else if(topic === 'category'){
        const data = await UserData.findById({_id}, {battleCategory:1})
        res.json({data: data.battleCategory})
    }
}

exports.getTestBattleRankings = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const topic = req.params['topic']

    if(topic === 'elemName'){
        const getRankings = await BattleElementNameEndlessRankings.find({},{username: 1, points: 1}).sort({points: -1})
        res.json({status:'ok', rankings:getRankings})
    }

    else if(topic === 'atomicNum'){
        const getRankings = await BattleAtomicNumberEndlessRankings.find({},{username: 1, points: 1}).sort({points: -1})
        res.json({status:'ok', rankings:getRankings})
    }

    else if(topic === 'atomicMass'){
        const getRankings = await BattleAtomicMassEndlessRankings.find({},{username: 1, points: 1}).sort({points: -1})
        res.json({status:'ok', rankings:getRankings})
    }

    else if(topic === 'category'){
        const getRankings = await BattleCategoryEndlessRankings.find({},{username: 1, points: 1}).sort({points: -1})
        res.json({status:'ok', rankings:getRankings})
    }
}

exports.mixDash = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const prizeCoins = req.body.prizeCoins

    const data = await UserData.findByIdAndUpdate({_id}, {
        $inc:{coins: prizeCoins}
    })

    res.json({status: 'ok', data: data})
}

exports.buyMixDashStage = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const stagePrice = req.body.stagePrice

    const buyStage = await UserData.findByIdAndUpdate({_id},{
        $inc:{coins: -(stagePrice), mixDash: 1}
    })

    res.json({status: 'ok'})
}

exports.getUserProgMixDash = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const data = await UserData.findById({_id},{mixDash:1})
    res.json({status:'ok', data:data.mixDash})
}


exports.getCoins = async (req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const data = await UserData.findById({_id}, {coins:1})
    if(data){
        res.json({status:'ok', data:data.coins})
    }
    else{
        res.json({status:'error', error:'Something went wrong. Please try again later'})
    }
}

exports.buyAccessories = async(req,res,next) =>{
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const top = req.body.top
    const bottom = req.body.bottom
    const accessory = req.body.accessory

    const total = req.body.total

    if(top !== ''){
        const pushTop = await UserData.findByIdAndUpdate({_id},{
            $push:{
                topOwned: top
                }
        })
    }

    if(bottom !== ''){
        const pushBottom = await UserData.findByIdAndUpdate({_id},{
            $push:{
                bottomOwned: bottom
                }
        })
    }

    if(accessory !== ''){
        const pushAccessory = await UserData.findByIdAndUpdate({_id},{
            $push:{
                accessoryOwned: accessory
                }
        })
    }

    const coins = await UserData.findByIdAndUpdate({_id}, {
        $inc:{
            coins: -(total)
        }
    })

    // res.json(pushAccessories)
    res.json({status:'asd'})
}

exports.getAccessoriesOwned = async(req,res,next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const data = await UserData.findById({_id},{topOwned:1, bottomOwned:1, accessoryOwned:1})

    if(data)
        res.json({status:'ok', data:data})

    else
        res.json({status:'error', error:'Something went wrong. Please try again later'})
}

exports.saveCharacter = async(req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)

    const gender = req.params['gender']
    const accessories = req.body.accessories

    const filePath = `../Character/${gender}/${_id}.png`
    const buffer = Buffer.from(req.body.base64.split(',')[1],'base64')

    const filePathHit = `../Character/${gender}/hit-${_id}.png`
    const bufferHit = Buffer.from(req.body.base64hit.split(',')[1],'base64')

    const response = await UserData.findByIdAndUpdate({_id},{
        $set:{
            accessoriesEquipped:accessories
        }
    })

    fs.writeFileSync(path.join(__dirname, filePath), buffer)
    fs.writeFileSync(path.join(__dirname, filePathHit), bufferHit)
}

exports.getCharacter = async(req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)
    
    const gender = req.params['gender']
    const filePath= `../Character/${gender}/${_id}.png`

    if(fs.existsSync(path.join(__dirname, filePath)))
        res.sendFile(path.join(__dirname, filePath))
    
    else
        res.sendFile(path.join(__dirname,`../Character/${gender}/${gender}.png`))
}

exports.getCharacterHit = async(req, res, next) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    const access = req.params['access']
    const _id = new ObjectId (access)
    
    const gender = req.params['gender']
    const filePath= `../Character/${gender}/hit-${_id}.png`

    if(fs.existsSync(path.join(__dirname, filePath)))
        res.sendFile(path.join(__dirname, filePath))
    
    else
        res.sendFile(path.join(__dirname,`../Character/${gender}/hit-${gender}.png`))
}

