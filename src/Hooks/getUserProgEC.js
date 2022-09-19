export default async function getUserProgEC(access){
    const response = await fetch('/api/userProgEC/'+access,{
        method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      })
    
      const data = await response.json()
      
      if(data.status === 'ok')
        return data
      else
        alert(data.error)
}