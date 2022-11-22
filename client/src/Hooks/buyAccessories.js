export default async function buyAccessories(access, top, bottom, accessory, total){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/buyAccessories/` + access,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            top, bottom, accessory, total
        })
    })

    const data = await response.json()

    if (data.status === 'ok'){
    }
    else{
        alert(data.error)
    }
}