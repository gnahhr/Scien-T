export default async function getUserProgME(access){ 
  const reponse = await fetch('/api/userProgME', {
    headers: {
      'token': access,
    },
  })

  const data = await response.json()
  if(data.status === 'ok')
    return data
  
  else
    alert(data.error)
}