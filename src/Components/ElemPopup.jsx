import React from 'react';
import Elements from './Elements';
import './ElemPopup.css';

const ElemPopup = ({xpos, ypos}) => {
  return (
    <div className="popup"
         style={{
          top: ypos <= 5 ? "28rem" : "",
          transform: xpos >= 16 ? "translate(-95%, -105%)" : "transform: translate(12%, -105%)",
          borderRadius:  xpos >= 16 ? "15px 75px 0px 15px" : "75px 15px 15px 0"
         }}>
      <div className="pop-header"
           style={{
            flexDirection: xpos >= 16 ? "row-reverse" : "row"
           }}>
          <div className="pop-text">
            <p className="element-name">
              Hydrogen
            </p>
            <p className="atomic-mass">
              1.008
            </p>
          </div>
          <div className="picture">
          </div>
      </div>
      <div className="pop-description">
        Description: Hydrogen is an explosive gas and also the lightest element.
      </div>
      <div className="pop-used">
        Where It's Used: Hydrogen makes up about 90 percent of atoms in the entire universe. The chemical is used heavily as both a gas and liquid fuel. Hydrogen was used as a main fuel for the Space Shuttle program by NASA, as well as currently being used heavily by the petroleum and manufacturing industries.
      </div>
    </div>
  )
}

export default ElemPopup