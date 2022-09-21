export default async function getUserProgEC(access){
    const response = await fetch('/api/userProgEC/'+access,{
        method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      })
    
      const data = await response.json()
      // console.log(data.userProg.electronConfiguration)
      if(data.status === 'ok')
        return data.userProg.electronConfiguration.atomicNumber
      else
        alert(data.error)
}