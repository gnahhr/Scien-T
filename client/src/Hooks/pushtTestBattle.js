export default async function pushTestBattle(access,topic, stage, score, prizeCoins){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/testBattle/${access}/${topic}/${stage}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            score, prizeCoins
        })
    })

    const data = await response.json()

    if(data.status === 'ok')
        console.log('ok')
    
    else{
        alert(data.error)
    }
}