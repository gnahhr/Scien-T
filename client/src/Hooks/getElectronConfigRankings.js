export default async function getElectronConfigRankings(){
    const response = await fetch('/api/getElectronConfigRankings',{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json()

    if(data.status === 'ok'){
        return data.rankings
    }
    else{
        alert(data.error)
    }
}