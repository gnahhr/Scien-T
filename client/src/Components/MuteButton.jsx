import React, {useState} from 'react'

import Music from '../Assets/Images/music.svg';
import Muted from '../Assets/Images/muted.svg';

const MuteButton = ({audio}) => {
  const [ muted, setMuted ] = useState(false);

  const onClickHandler = () => {
    if (!muted) {
        audio.forEach((file) => file.muted = true);
    } else {
        audio.forEach((file) => file.muted = false);
    }

    setMuted(() => !muted);
  }

  return (
    <div className="icon">
        <img src={muted ? Muted : Music} alt="sound-toggle" onClick={() => onClickHandler()}/>
    </div>
  )
}

export default MuteButton