export default async function buyMixDashStage(access, stagePrice){
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/buyMixDashStage/` + access,{
        method:  'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stagePrice
        })
    })
}