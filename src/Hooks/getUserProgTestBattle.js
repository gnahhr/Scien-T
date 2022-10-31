export default async function getUserProgTestBattle(access, topic){
    const response = await fetch('/api/userProgTestBattle/' + access + '/' + topic,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json()
    console.log(data.data)
    return data.data
}