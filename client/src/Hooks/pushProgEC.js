export default async function pushProgEC(access,points,prizeCoins) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/electronConfiguration`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access, points, prizeCoins
        })
    })
    const data = await response.json()

    if (data.status === 'ok'){
    }
    else{
        alert(data.error)
      }
}