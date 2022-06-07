import React, { useState } from 'react';
import * as Tone from 'tone';

function Synthesizer() {
  const startingOctave = 4

const [octave, setOctave] = useState(startingOctave);
const increaseOctave = () =>{
  if(octave < startingOctave + 2){
    setOctave(prevState => prevState + 1)
  }
}
const decreaseOctave = () =>{
  if(octave > startingOctave - 2){
    setOctave(prevState => prevState - 1)
  }
}
const synth = new Tone.Synth().toDestination();

  return (
    <div>
      Synthesizer
      <button onClick={() => synth.triggerAttackRelease(`C${octave}`, "8n")} > C</button>
      <button onClick={increaseOctave}> +1 Octave</button>
      <button onClick={decreaseOctave}> -1 Octave</button>
      <button onClick={() => setOctave(startingOctave)}> Reset Octave</button>

      <ul id="keyboard">
  <li name="C" class="white" onClick={(e)=> synth.triggerAttackRelease(`${e.target.name}${octave}`, "8n")}>A</li>
  <li name="C#" class="black" onClick={(e)=> synth.triggerAttackRelease(`${e.target.name}${octave}`, "8n")}>W</li>
  <li name="D" class="white offset" onClick={(e)=> synth.triggerAttackRelease(`${e.target.name}${octave}`, "8n")}>S</li>
  <li name="D#" class="black" onClick={(e)=> synth.triggerAttackRelease(`${e.target.name}${octave}`, "8n")}>E</li>
  <li name="E" class="white offset" onClick={(e)=> synth.triggerAttackRelease(`${e.target.name}${octave}`, "8n")}>D</li>
  <li name="F" class="white" onClick={(e)=> synth.triggerAttackRelease(`${e.target.name}${octave}`, "8n")}>F</li>
  <li name="F#" class="black" onClick={(e)=> synth.triggerAttackRelease(`${e.target.name}${octave}`, "8n")}>T</li>
  <li name="G" class="white offset" onClick={(e)=> synth.triggerAttackRelease(`${e.target.name}${octave}`, "8n")}>G</li>
  <li name="G#" class="black" onClick={(e)=> synth.triggerAttackRelease(`${e.target.name}${octave}`, "8n")}>Y</li>
  <li name="A" class="white offset" onClick={(e)=> synth.triggerAttackRelease(`${e.target.name}${octave}`, "8n")}>H</li>
  <li name="A#" class="black" onClick={(e)=> synth.triggerAttackRelease(`${e.target.name}${octave}`, "8n")}>U</li>
  <li name="B" class="white offset" onClick={(e)=> synth.triggerAttackRelease(`${e.target.name}${octave}`, "8n")}>J</li>
  <li name="C2" class="white" onClick={()=> synth.triggerAttackRelease(`C${octave + 1}`, "8n")}>K</li>
  <li name="C#2" class="black" onClick={()=> synth.triggerAttackRelease(`C#${octave + 1}`, "8n")}>O</li>
  <li name="D2" class="white offset" onClick={()=> synth.triggerAttackRelease(`D${octave + 1}`, "8n")}>L</li>
  <li name="D#2" class="black" onClick={()=> synth.triggerAttackRelease(`D#${octave + 1}`, "8n")}>P</li>
  <li name="E2" class="white offset" onClick={()=> synth.triggerAttackRelease(`E${octave + 1}`, "8n")}>;</li>
</ul>
      </div>
  )
}

export default Synthesizer
