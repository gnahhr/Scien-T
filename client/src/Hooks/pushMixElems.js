export default async function pushMixElems(element,access){ 
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mixElements`,{              
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access, element
      })
    })
    
    const data = await response.json()
    if (data.status === 'ok'){
    }
    else{
      alert(data.error)
    }

}
