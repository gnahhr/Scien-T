export default async function pushProgEC(access,atomicNumber,points) {
    const response = await fetch('/api/electronConfiguration',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access, atomicNumber, points
        })
    })
    const data = await response.json()

    if (data.status === 'ok'){
    }
    else{
        alert(data.error)
      }
}