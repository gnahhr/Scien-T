export default async function pushTestBattle(access,username,topic, stage, score){
    const response = await fetch('/api/testBattle/' + access + '/' + username + '/' + topic + '/' + stage,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            score
        })
    })

    const data = await response.json()
}