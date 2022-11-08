export default async function pushMixDash(access){
    const response = await fetch('/api/mixDash/' + access,{
        method:  'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}