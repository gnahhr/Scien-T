export default async function getIntellimentData(access, difficulty){
    const response = await fetch('/api/getIntellimentData/'+access+'/'+difficulty,{
        method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      })
      const data = await response.json()
      console.log(data.data)
      return data.data
}