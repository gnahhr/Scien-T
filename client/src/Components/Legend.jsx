import React from 'react';
import ElemColors from '../Data/ElemColors.js';


const Legend = () => {
  const { familyBGs, familyBDs } = ElemColors;

  const categories = [
    "diatomic nonmetal",
    "polyatomic nonmetal",
    "noble gas",
    "alkali metal",
    "alkaline earth metal",
    "transition metal",
    "post-transition metal",
    "metalloid",
    "actinide",
    "lanthanide",
  ]

  return (
    <div className="legends">
        <h2>Legend</h2>
        <div className="color-legends">
        {familyBGs && categories.map((category) =>
            <div className="category-lgroup">
            <div className="legends-color"
                style={{
                    backgroundColor: familyBGs[category],
                    border: `solid 2px ${familyBDs[category]}`
                }}>
            </div>
            <div className="legends-label">
                <span>{category}</span>
            </div>
            </div>
        )}
        <div className="category-lgroup">
            <div className="legends-color"
                style={{
                    backgroundColor: "#EBF3F6",
                    border: `solid 2px #D8E9EF`
                }}>
            </div>
            <div className="legends-label">
                <span>unkown</span>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Legend