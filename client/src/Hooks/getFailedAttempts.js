export default async function getFailedAttempts(username){
    const response = await fetch (`${process.env.REACT_APP_API_URL}/api/failedAttempts/${username}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json()
    console.log(data.counter.counter)
    return data.counter.counter
}