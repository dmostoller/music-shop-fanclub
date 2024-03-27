import React, {useState} from 'react'
import WavesurferPlayer from '@wavesurfer/react'

const Player = ({track}) => {
  const [wavesurfer, setWavesurfer] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const onReady = (ws) => {
    setWavesurfer(ws)
    setIsPlaying(false)
  }

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause()
  }

  console.log(track)
  return (
    <>
    <table width="100%">
        <tr>
        <td width="30px">
            <button style={{float: "left"}} className='ui circular icon button secondary mini' onClick={onPlayPause}>
                { isPlaying ? <i className='pause icon'></i> : <i className='play icon'></i> }
            </button>
        </td>
        <td>
            <WavesurferPlayer
            height={30}
            waveColor="rgba(89, 4, 181, 1)"
            // barWidth="2"
            progressColor= 'rgba(0, 0, 100, 0.5)'
            url={track}
            onReady={onReady}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
        />
        </td>
        </tr>
    </table>
      


    </>
  )
}
export default Player