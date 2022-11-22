import React from 'react';
import './NewRecipeModal.css';
// newCompound: {
//   name: "Sodium chloride",
//   elems: ["Na", "Cl"]
// } 


const NewRecipeModal = ({newCompound, showModal}) => {

  return (
    <div className="modal-wrapper">
      <div className="newRecipe-modal">
        <h2>New compound unlocked!</h2>
        <div className="recipe-wrapper">
          <div className="elem-wrapper">
            {newCompound.elems.map((elem) => 
              <div className="recipe-element" key={elem}>
                <p>{elem}</p>
              </div>
            )}
          </div>
          <h3>=</h3>
          <h3 className="compound-name">{newCompound.name}</h3>
        </div>
        <button className="fluid-btn teal" onClick={() => showModal(false)}>
          Proceed
        </button>
      </div>
    </div>
    
  )
}

export default NewRecipeModal