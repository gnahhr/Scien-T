import React from 'react'

import rank1 from "../Assets/Images/rank1.png"
import rank2 from "../Assets/Images/rank2.png"
import rank3 from "../Assets/Images/rank3.png"

import "./IntellimentRankings.css"

const IntellimentRankings = ({rankings}) => {

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

  return (
    <div className="wrapper"> 
      <table className="ranking-list">
        <tr className="table-header">
          <th>Rank</th>
          <th>Name</th>
          <th>Total Score</th>
        </tr>
        {rankings.map((rankings,index) => {
          return(
            <tr key={rankings.username} className="output-rankings">
              {index < 3 ? <td className="rank"><img src={titleHolders(index)} alt="medal" width={40}/></td> : <td>{index+1}</td>}
              <td>{rankings.username}</td> 
              <td>{rankings.points}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default IntellimentRankings