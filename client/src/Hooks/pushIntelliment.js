export default async function pushIntelliment(score, access, username, category, corAve){
    const response = await fetch (`${process.env.REACT_APP_API_URL}/api/intelliment`,{              
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access, score, username, category, corAve
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