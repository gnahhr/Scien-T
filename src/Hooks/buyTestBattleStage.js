export default async function buyTestBattleStage(access, topic, stagePrice){
    const response = await fetch('/api/buyTestBattleStage/' + access + '/' + topic,{
        method:  'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:{
            stagePrice
        }
    })
}