export default async function pushMixDash(access, prizeCoins){
    const response = await fetch('/api/mixDash/' + access,{
        method:  'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prizeCoins
        })
    })
}