export default async function buyMixDashStage(access, stagePrice){
    const response = await fetch('/api/buyMixDashStage/' + access,{
        method:  'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stagePrice
        })
    })
}