export default async function saveCharacter(access, base64){
    const response = await fetch('/api/saveCharacter/'+access,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            base64
        })
    })

    const data = await response.json()
}