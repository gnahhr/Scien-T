export default async function getTestBattleRankings(topic){
    const response = await fetch('/api/getTestBattleRankings/' + topic,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json()

    // console.log(data.rankings)
    if(data.status === 'ok'){
        return data.rankings
    }
    else{
        alert(data.error)
    }
}