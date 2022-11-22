export default async function getCharacterHit(access, gender){
    const response = await fetch('/api/getCharacterHit/' + access + '/' + gender,{
        method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      })
    
      return response.url
}