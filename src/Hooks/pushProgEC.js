export default async function pushProgEC(access,points,prizeCoins,username) {
    const response = await fetch('/api/electronConfiguration',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access, points, username, prizeCoins
        })
    })
    const data = await response.json()

    if (data.status === 'ok'){
    }
    else{
        alert(data.error)
      }
}