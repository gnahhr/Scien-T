export default async function getUserProgMixDash(access){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/userProgMixDash/${access}` ,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json()
    return data.data

   
}