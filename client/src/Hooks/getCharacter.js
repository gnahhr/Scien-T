export default async function getCharacter(access, gender){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/getCharacter/${access}/${gender}` ,{
        method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      })
    
      return response.url
}