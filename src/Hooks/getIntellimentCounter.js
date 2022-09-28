export default async function getIntellimentCounter(access, difficulty){
    const response = await fetch('/api/getIntellimentCounter/'+access+'/'+difficulty,{
        method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      })
      const data = await response.json()
      return data.data
}