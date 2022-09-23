export default async function getIntellimentRankings(difficulty){
    const response = await fetch('/api/getIntellimentRankings/' + difficulty,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json()

    console.log(data.rankings)
    if(data.status === 'ok'){
        console.log('here')
        return data.rankings
    }
    else{
        alert(data.error)
    }
}