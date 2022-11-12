export default async function buyAccessories(access, accessories, total){
    const response = await fetch('/api/buyAccessories/' + access,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            accessories, total
        })
    })

    const data = await response.json()

    if (data.status === 'ok'){
    }
    else{
        alert(data.error)
    }

}