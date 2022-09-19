export default async function pushEProg(element,access){ 
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
      console.log('ok')
    }
    else{
      alert(data.error)
    }

}
