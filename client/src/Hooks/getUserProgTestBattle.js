export default async function getUserProgTestBattle(access, topic){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/userProgTestBattle/${access}/${topic}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json()
    return data.data
}