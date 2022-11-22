export default async function requestOTP(username){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/requestOTP/${username}`, {
        method:'GET',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json()
    
    return data.user

}