export default async function getAccessoriesEquipped(access){
    const response = await fetch('/api/getAccessoriesEquipped/' + access,{
        method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
    })

    const data = await response.json()

    if(data.status === 'ok')
        return data.data

    else
        alert(data.error)
}