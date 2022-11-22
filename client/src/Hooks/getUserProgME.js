export default async function getUserProgME(access){ 
  const response = await fetch('/api/userProgME/' + access, {
    method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
  })

  const data = await response.json()
  
  if(data.status === 'ok'){
    return data.userProg.mixingElements;
  }
  else
    alert(data.error)
}