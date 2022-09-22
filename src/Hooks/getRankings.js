export default async function getRankings(){
    const response = await fetch('/api/getRankings',{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json()

    if(data.status === 'ok'){
        console.log('here')
        return data.rankings
    }
    else{
        alert(data.error)
    }
}