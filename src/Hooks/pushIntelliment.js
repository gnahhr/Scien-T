export default async function pushIntelliment(score, access){
    const response = await fetch ('/api/intelliment',{              
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access, score
        })
      })
      
      const data = await response.json()
      if (data.status === 'ok'){
        console.log('ok')
      }
      else{
        console.error(data.error)
      }
}