export default async function getIntellimentData(access, difficulty){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/getIntellimentData/${access}/${difficulty}`,{
        method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      })
      const data = await response.json()
      return data.data
}