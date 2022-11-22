export default async function saveCharacter(access, gender, top, bottom, accessory, base64, base64hit){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/saveCharacter/${access}/${gender}` ,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            base64, base64hit, top, bottom, accessory
        })
    })

    const data = await response.json()
}