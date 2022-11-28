import React from 'react';
import { NavLink } from 'react-router-dom';

//Components
import Bohr3D from './Bohr3D';

//Data
import ElemColors from '../Data/ElemColors.js';
import { elemPics } from '../Data/ElementPictures.js';

//Design
import './PeriodicModal.css';

const PeriodicModal = ({data, showModal}) => {
  const { familyBGs } = ElemColors;

  return (
    <div className="periodic-modal">
        <div className="wrapper">
            <div className="exit" onClick={() => showModal(false)}>X</div>
            <h2 className="category">{data.category}</h2>
            <div className="element-header">
                <div className="element-wrapper"
                    style={{
                        backgroundColor: familyBGs[data.category] ? familyBGs[data.category] : "#EBF3F6" 
                    }}>
                    <p className="atomic-num">{data.number}</p>
                    <p className="element-sym">{data.symbol}</p>
                    <div className="element-name">{data.name}</div>
                    <div className="element-weight">{data.atomic_mass}</div>
                </div>
                <div className="element-picture">
                    <img src={`/images/Elements/${elemPics[data.number-1].picture}`} alt={data.name} />
                </div>
            </div>
            <div className="description-wrapper">
                <div className="left-desc">Discovered By:</div>
                <div className="right-desc">{data.discovered_by}</div>
                <div className="left-desc">Electron Configuration:</div>
                <div className="right-desc">{data.electron_configuration}</div>
                {data.melt && <>
                <div className="left-desc">Melting Point:</div>
                <div className="right-desc">{data.melt} K</div></>}
                {data.boil && <>
                <div className="left-desc">Boiling Point:</div>
                <div className="right-desc">{data.boil} K</div></>}
                {data.electronegativity_pauling && <>
                <div className="left-desc">Electronegativity:</div>
                <div className="right-desc">{data.electronegativity_pauling}</div></>}
            </div>
            <h2>Bohr Model</h2>
            <div className="bohr-img">
                <Bohr3D name={data.name} model3d={data.bohr_model_3d} model={data.bohr_model_image} />
                {/* <img src={data.bohr_model_image} alt="bohr" /> */}
            </div>
            <p className="summary"><strong>Summary:</strong> {data.summary}</p>
            <NavLink to={`/trivias/${data.name}`} className="button cta">Learn more trivia!</NavLink>
        </div>
    </div>
  )
}

export default PeriodicModal