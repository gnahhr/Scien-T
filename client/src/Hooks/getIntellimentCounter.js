export default async function getIntellimentCounter(access, difficulty){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/getIntellimentCounter/${access}/${difficulty}`,{
        method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      })
    const data = await response.json()

    if(data.status  === 'ok')
      return data.data

    else
      console.log(data.error)
}