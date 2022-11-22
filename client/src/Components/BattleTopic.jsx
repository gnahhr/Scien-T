import React from 'react';
import "./BattleTopic.css";

const BattleTopic = ({setTopic, nextPhase}) => {
  const topics = [
    {
        name: "Element Name",
        value: "elemName",
    },
    {
        name: "Atomic Number",
        value: "atomicNum",
    },
    {
        name: "Atomic Mass",
        value: "atomicMass",
    },
    {
        name: "Category",
        value: "category",
    },
  ]

  const onClickHandler = (value) => {
    setTopic(value);
    nextPhase(1);
  }

  return (
    <div className="topic-wrapper">
        <h2>Choose a topic:</h2>
        <div className="topics">
          {topics.map(topic => <button className="fluid-btn" key={topic.name} onClick={() => onClickHandler(topic.value)}>{topic.name}</button>)}
        </div>
    </div>
  )
}

export default BattleTopic