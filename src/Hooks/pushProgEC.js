export default async function pushProgEC(access,atomicNumber,points, username) {
    const response = await fetch('/api/electronConfiguration',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access, atomicNumber, points, username
        })
    })
    const data = await response.json()

    if (data.status === 'ok'){
    }
    else{
        alert(data.error)
      }
}