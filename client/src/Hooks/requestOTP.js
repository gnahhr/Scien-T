export default async function requestOTP(username){
    const response = await fetch('/api/requestOTP/' + username, {
        method:'GET',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })

    const data = await response.json()
    
    return data.user

}