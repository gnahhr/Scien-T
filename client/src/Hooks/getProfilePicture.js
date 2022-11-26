export default async function getProfilePicture(access,gender){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/getProfilePicture/${access}/${gender}` ,{
        method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      })

      return response.url
}