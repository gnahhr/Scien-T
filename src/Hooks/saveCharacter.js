export default async function saveCharacter(access, gender, accessories, base64, base64hit){
    const response = await fetch('/api/saveCharacter/' + access + '/' + gender,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            base64,base64hit,accessories
        })
    })

    const data = await response.json()
}