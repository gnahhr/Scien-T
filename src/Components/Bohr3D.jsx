import React from 'react';
// import '@google/model-viewer';

const Bohr3D = ({name, model3d, model}) => {
  return (
    <model-viewer src={model3d}
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls poster="poster.webp"
                shadow-intensity="1"
                autoplay>
    </model-viewer>
  )
}

export default Bohr3D