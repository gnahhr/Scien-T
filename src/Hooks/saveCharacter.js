export default async function saveCharacter(access, gender, accessories, base64){
    const response = await fetch('/api/saveCharacter/' + access + '/' + gender,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            base64,accessories
        })
    })

    const data = await response.json()
}