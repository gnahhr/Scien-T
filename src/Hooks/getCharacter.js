export default async function getCharacter(access){
    const response = await fetch('/api/getCharacter/'+access,{
        method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      })
    
      return response.url
}