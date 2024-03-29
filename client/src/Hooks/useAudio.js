import { useEffect, useRef } from "react"

export default function useAudio(src, { volume = 1, playbackRate = 1, loop = false}){
    const audio = useRef(new Audio(src))
  
    useEffect(() => {
      audio.current.volume = volume
    }, [volume])
  
    useEffect(() => {
      audio.current.playbackRate = playbackRate
    }, [playbackRate])

    useEffect(() => {
        audio.current.loop = loop
    }, [loop])

    return audio.current
}