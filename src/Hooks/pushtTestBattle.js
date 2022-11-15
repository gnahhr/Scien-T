export default async function pushTestBattle(access,username,topic, stage, score, prizeCoins){
    const response = await fetch('/api/testBattle/' + access + '/' + username + '/' + topic + '/' + stage,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            score, prizeCoins
        })
    })

    const data = await response.json()
}