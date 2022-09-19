export default async function pushMixElems(element,access){ 
    const response = await fetch('/api/mixElements',{              
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
      // console.log('ok')
    }
    else{
      console.error(data.error)
    }

}
