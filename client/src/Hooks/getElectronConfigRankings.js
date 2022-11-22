export default async function getElectronConfigRankings(){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/getElectronConfigRankings`,{
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