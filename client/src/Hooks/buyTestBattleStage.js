export default async function buyTestBattleStage(access, topic, stagePrice){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/buyTestBattleStage/` + access + '/' + topic,{
        method:  'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stagePrice
        })
    })

    const data = await response.json()

    if(data.status === 'ok')
        console.log(data.status)
    
    else
        alert(data.error)
}