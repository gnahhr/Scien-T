export default async function getCharacter(access, gender){
    const response = await fetch('/api/getCharacter/' + access + '/' + gender,{
        method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      })
    
      return response.url
}