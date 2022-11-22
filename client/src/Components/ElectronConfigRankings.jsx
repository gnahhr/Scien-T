import React, { useState, useEffect }  from 'react';
import jwtDecode from "jwt-decode"

import rank1 from "../Assets/Images/rank1.png";
import rank2 from "../Assets/Images/rank2.png";
import rank3 from "../Assets/Images/rank3.png";

import "./IntellimentRankings"


const ElectronConfigRankings = ({rankings}) => {
  const [ username, setUsername] = useState('');
  const [ index, setIndex] = useState();

  useEffect(()=>{
    const token = localStorage.getItem('token')
    const user = jwtDecode(token)
    setUsername(user.username)
    setIndex(rankings.findIndex(x => x.username === user.username))
  })

  const titleHolders = (index) => {
    if(index === 0){
      return rank1
    }
    else if(index === 1){
      return rank2
    }

    else{
      return rank3
    }
}

const getPoints = (index) => {
  return rankings.map((rankings,i) => {
    if(i === index){
      return rankings.points
    }
  })
}
//{index + 1}  {username}  {getPoints(index)} call out mo nalang itey para sa rank ng current user
return (
<div className="wrapper rank-wrap">
    <table className="ranking-list">
      <thead>
        <tr className="table-header">
          <th>Rank</th>
          <th>Name</th>
          <th>Total Score</th>
        </tr>
      </thead>
      <tbody>
        {rankings.map((rankings,index) => {
          return(
            <tr key={rankings.username} className="output-rankings">
              {index < 3 ? <td className="rank"><img src={titleHolders(index)} alt="medal" width={40}/></td> : <td>{index+1}</td>}
              <td>{rankings.username}</td>
              <td>{rankings.points}</td>
            </tr>
          )
        })}
      </tbody>
      {/* <tr className="user-rank">
        <td>{index + 1}</td>
        <td>{username}</td>
        <td>{getPoints(index)}</td>
      </tr> */}
    </table>
    </div>
  )
}

export default ElectronConfigRankings