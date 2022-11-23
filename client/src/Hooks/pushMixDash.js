export default async function pushMixDash(access, prizeCoins){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mixDash/${access}`,{
        method:  'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prizeCoins
        })
    })

    const data = await response.json()

    if(data.status === 'ok')
        console.log('ok')

    else{
        alert(data.error)
    }
}