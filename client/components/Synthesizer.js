import React, { useState, useEffect } from "react";
import * as Tone from "tone";

export default Synthesizer;
function Synthesizer() {
  const startingOctave = 3;
  let noteFreq = [];
  const createNoteTable = () => {
    for (let i = 0; i < 8; i++) {
      noteFreq[i] = [];
      noteFreq[i]["C"] =
        i === 0 ? 32.703195662574829 : noteFreq[i - 1]["C"] * 2;
      noteFreq[i]["C#"] =
        i === 0 ? 34.647828872109012 : noteFreq[i - 1]["C#"] * 2;
      noteFreq[i]["D"] =
        i === 0 ? 36.708095989675945 : noteFreq[i - 1]["D"] * 2;
      noteFreq[i]["D#"] =
        i === 0 ? 38.890872965260113 : noteFreq[i - 1]["D#"] * 2;
      noteFreq[i]["E"] =
        i === 0 ? 41.203444614108741 : noteFreq[i - 1]["E"] * 2;
      noteFreq[i]["F"] =
        i === 0 ? 43.653528929125485 : noteFreq[i - 1]["F"] * 2;
      noteFreq[i]["F#"] =
        i === 0 ? 46.249302838954299 : noteFreq[i - 1]["F#"] * 2;
      noteFreq[i]["G"] =
        i === 0 ? 48.999429497718661 : noteFreq[i - 1]["G"] * 2;
      noteFreq[i]["G#"] =
        i === 0 ? 51.913087197493142 : noteFreq[i - 1]["G#"] * 2;
      noteFreq[i]["A"] = i === 0 ? 55.0 : noteFreq[i - 1]["A"] * 2;
      noteFreq[i]["A#"] =
        i === 0 ? 58.270470189761239 : noteFreq[i - 1]["A#"] * 2;
      noteFreq[i]["B"] =
        i === 0 ? 61.735412657015513 : noteFreq[i - 1]["B"] * 2;
    }
    return noteFreq;
  };
  noteFreq = createNoteTable()

  const keyMappings = {
    A: {
      id: "C",
      element: document.getElementById("C"),
      note: "C",
      octave: 0,
      pressed: false,
    },
    W: {
      id: "C#",
      element: document.getElementById("C#"),
      note: "C#",
      octave: 0,
      pressed: false,
    },
    S: {
      id: "D",
      element: document.getElementById("D"),
      note: "D",
      octave: 0,
      pressed: false,
    },
    E: {
      id: "D#",
      element: document.getElementById("D#"),
      note: "D#",
      octave: 0,
      pressed: false,
    },
    D: {
      id: "E",
      element: document.getElementById("E"),
      note: "E",
      octave: 0,
      pressed: false,
    },
    F: {
      id: "F",
      element: document.getElementById("F"),
      note: "F",
      octave: 0,
      pressed: false,
    },
    T: {
      id: "F#",
      element: document.getElementById("F#"),
      note: "F#",
      octave: 0,
      pressed: false,
    },
    G: {
      id: "G",
      element: document.getElementById("G"),
      note: "G",
      octave: 0,
      pressed: false,
    },
    Y: {
      id: "G#",
      element: document.getElementById("G#"),
      note: "G#",
      octave: 0,
      pressed: false,
    },
    H: {
      id: "A",
      element: document.getElementById("A"),
      note: "A",
      octave: 0,
      pressed: false,
    },
    U: {
      id: "A#",
      element: document.getElementById("A#"),
      note: "A#",
      octave: 0,
      pressed: false,
    },
    J: {
      id: "B",
      element: document.getElementById("B"),
      note: "B",
      octave: 0,
      pressed: false,
    },
    K: {
      id: "C2",
      element: document.getElementById("C2"),
      note: "C",
      octave: 1,
      pressed: false,
    },
    O: {
      id: "C#2",
      element: document.getElementById("C#2"),
      note: "C#",
      octave: 1,
      pressed: false,
    },
    L: {
      id: "D2",
      element: document.getElementById("D2"),
      note: "D",
      octave: 1,
      pressed: false,
    },
    P: {
      id: "D#2",
      element: document.getElementById("D#2"),
      note: "D#",
      octave: 1,
      pressed: false,
    },
    ";": {
      id: "E2",
      element: document.getElementById("E2"),
      note: "E",
      octave: 1,
      pressed: false,
    },
  };
  // States
  const [noteProps, setNoteProps] = useState(keyMappings);
  const [pressedKeys, setPressedKeys] = useState({});
  const [octave, setOctave] = useState(startingOctave);
  const [buttonAni, setButtonAni] = useState(false);
  const [volume, setVolume] = useState("0.025");
  const [mainGainNode, setMainGainNode] = useState(undefined);
  const [oscList, setOscList] = useState(noteFreq);

  const [audioContext, setAudioContext] = useState(
    new (window.AudioContext || window.webkitAudioContext)()
  );
  const [mousePressed, setMousePressed] = useState(false)

  let customWaveform = null;
  let sineTerms = null;
  let cosineTerms = null;

  let synth = new Tone.PolySynth(Tone.Synth).toDestination();

  const increaseOctave = () => {
    if (octave < startingOctave + 2) {
      setOctave((prevState) => prevState + 1);
    }
  };
  const decreaseOctave = () => {
    if (octave > startingOctave - 2) {
      setOctave((prevState) => prevState - 1);
    }
  };

  const playOsc = async (o, n) => {
    let osc = audioContext.createOscillator();
    // mainGainNode.gain.linearRampToValueAtTime(Number(volume), audioContext.currentTime + 1 + 0.005)

      osc.connect(mainGainNode);
      osc.type = "sine";
      osc.frequency.value = noteFreq[o][n];
      await osc.start();
      return osc;
  };

  const stopOsc = async (osc) => {
    console.log(osc)
    // osc.onended = async () => {
      // mainGainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1)

      await osc.stop();
    // mainGainNode.gain.linearRampToValueAtTime(Number(volume), audioContext.currentTime + 10 + 0.005)

    // }
    return osc;
  };

  const downHandler = async ({ key }) => {
    const keyPress = String(key).toUpperCase();
    if (noteProps[keyPress]) {
      if (!noteProps[keyPress].pressed) {
        let currentOctave = octave + noteProps[keyPress].octave
        let newStart = await playOsc(
         currentOctave ,
          noteProps[keyPress].note
        );
        setOscList(async (prevState) => {
          let promise = await prevState
          let newState =  [...promise] ;
          newState[currentOctave][
            noteProps[keyPress].note
          ] = newStart;


          return newState;
        });


        setNoteProps((prevState) => {
          let newState = { ...prevState };
          newState[keyPress].pressed = true;
          return newState;
        });
      }
    }
  };
  const upHandler = async ({ key }) => {
    const keyPress = String(key).toUpperCase();
    const noteValue = noteProps[keyPress].note
    if (noteProps[keyPress]) {
      let currentOctave =octave + noteProps[keyPress].octave

// in case state is stuck in promise
      let resultPromise = await oscList

      let promiseOsc = resultPromise[currentOctave][
        noteProps[keyPress].note
      ]
    //  await mainGainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1)

      stopOsc(
        promiseOsc
      );

      setNoteProps((prevState) => {
        let newState = { ...prevState };
        newState[keyPress].pressed = false;
        return newState;
      });
    }
  };
  const mouseDownHandler = (e) =>{
    setMousePressed(true)
    if(e.target.dataset.key){
      downHandler(e.target.dataset)
    }
  }
  const mouseUpHandler = (e) =>{
    setMousePressed(false)
    if(e.target.dataset.key){
      upHandler(e.target.dataset)
    }
  }

  const changeVolume = (e) => {
    e.persist();
    console.log(e.target.value);
    setVolume((prevState) => e.target.value);
    // mainGainNode.gain.value = volume
  };
  const pressedNotes = new Map();
  let clickedKey = "";
  const playKey = (key) => {
    if (!keyMappings[key]) {
      return;
    }

    keyMappings[key].element.classList.add("pressed");
    pressedNotes.set(key, osc);
    pressedNotes.get(key).start();
  };
  const playNote = (event, note) => {
    event.target.classList.add("pressed");
    synth.triggerAttackRelease(`C${octave}`, "8n");
  };
  // Effects
  useEffect(() => {

    if(!mainGainNode){
      const gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination);
      gainNode.gain.value =volume;
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.005)
    gainNode.gain.linearRampToValueAtTime(Number(volume), audioContext.currentTime + 1 + 0.005)

      setMainGainNode(gainNode);
    }
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      synth = new Tone.PolySynth(Tone.Synth).toDestination();
      setTimeout(function () {
        // e.target.classList.remove('animate');
        setButtonAni((prevState) => false);
      }, 700);
    };
  }, [octave, buttonAni, mainGainNode]); // Component will update when octave state changes

  useEffect(()=>{
    if(mainGainNode === undefined){
      return;
    }else {
let {currentTime} =audioContext
let attack =2
      // mainGainNode
      // mainGainNode.gain.cancelScheduledValues(currentTime)
      // mainGainNode.gain.setValueAtTime(0, currentTime + 0.005)
      // mainGainNode.gain.linearRampToValueAtTime(Number(volume), currentTime + attack + 0.005)
mainGainNode.gain.value =volume;
    }
  }, [volume, mainGainNode])

  return (
    <div>
      {!audioContext ? (
        <div>
          <button
            onClick={() => {
              setAudioContext(
                new (window.AudioContext || window.webkitAudioContext)()
              );
              // mainGainNode = audioContext.createGain();
              mainGainNode.connect(audioContext.destination);
              mainGainNode.gain.value = volume;
            }}
          >
            Create Audio Context
          </button>
        </div>
      ) : (
        <div>
          Synthesizer
          {/* {console.log(window)} */}
          {/* <br />
      <br />
      <br />
      <br /> */}
          {/* <button
            onClick={() => synth.triggerAttackRelease(`C${octave}`, "8n")}
          >
            {" "}
            C
          </button> */}
          {/* <div className="button-container"> */}
          <button
            className={buttonAni ? `button-glow animate` : `button-glow`}
            onClick={() => increaseOctave()}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            +1 Octave
          </button>
          <button
            className={buttonAni ? `button-glow animate` : `button-glow`}
            onClick={() => decreaseOctave()}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            -1 Octave
          </button>
          <button
            className={buttonAni ? `button-glow animate` : `button-glow`}
            onClick={() => setOctave(startingOctave)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Reset Octave
          </button>
          <div className="settingsBar">
            <div className="left">
              <label>Volume: </label>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.01"
                value={volume}
                list="volumes"
                name="volume"
                onChange={(e) => changeVolume(e)}
              />
              {/* <datalist id="volumes">
      <option value="0.0" label="Mute" />
      <option value="1.0" label="100%" />
    </datalist> */}
            </div>
            <div className="right">
              {/* <label>Current waveform: </label> */}
              {/* <select name="waveform" defaultValue="sine">
                <option value="sine">Sine</option>
                <option value="square" selected>
                  Square
                </option>
                <option value="sawtooth">Sawtooth</option>
                <option value="triangle">Triangle</option>
                <option value="custom">Custom</option>
              </select> */}
            </div>
          </div>
          {/* </div> */}
          <div
            style={{
              margin: 0,
              position: "absolute",
              top: " 50%",
              transform: "translateY(-50%)",
              left: "40%",
            }}
          >
            <span style={{zIndex: 2, right: "250px",top: "20px"}}>{octave - startingOctave === 0 ? '' : octave > startingOctave ? `+${octave - startingOctave}`:  `${octave - startingOctave}`}</span>
            <ul id="keyboard">
              <li
                id="C"
                className={` ${
                  noteProps[`A`]["pressed"] ? "white pressed" : "white"
                }`}
                data-key={`A`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'A'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'A'})
                  }
                }}
                onClick={() => {}}
              >
                A
              </li>
              <li
                id="C#"
                className={`${
                  noteProps[`W`]["pressed"] ? "black pressed" : "black"
                }`}
                data-key={`W`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'W'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'W'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`C#${octave}`, "8n");
                }}
              >
                W
              </li>
              <li
                id="D"
                className={`${
                  noteProps[`S`]["pressed"]
                    ? "white offset pressed"
                    : "white offset"
                }`}
                data-key={`S`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'S'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'S'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`D${octave}`, "8n");
                }}
              >
                S
              </li>
              <li
                id="D#"
                className={`${
                  noteProps[`E`]["pressed"] ? "black pressed" : "black"
                }`}
                data-key={`E`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'E'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'E'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`D#${octave}`, "8n");
                }}
              >
                E
              </li>
              <li
                id="E"
                className={`${
                  noteProps[`D`]["pressed"]
                    ? "white offset pressed"
                    : "white offset"
                }`}
                data-key={`D`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'D'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'D'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`E${octave}`, "8n");
                }}
              >
                D
              </li>
              <li
                id="F"
                className={` ${
                  noteProps[`F`]["pressed"] ? "white pressed" : "white"
                }`}
                data-key={`F`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'F'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'F'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`F${octave}`, "8n");
                }}
              >
                F
              </li>
              <li
                id="F#"
                className={`${
                  noteProps[`T`]["pressed"] ? "black pressed" : "black"
                }`}
                data-key={`T`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'T'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'T'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`F#${octave}`, "8n");
                }}
              >
                T
              </li>
              <li
                id="G"
                className={`${
                  noteProps[`G`]["pressed"]
                    ? "white offset pressed"
                    : "white offset"
                }`}
                data-key={`G`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'G'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'G'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`G${octave}`, "8n");
                }}
              >
                G
              </li>
              <li
                id="G#"
                className={`${
                  noteProps[`Y`]["pressed"] ? "black pressed" : "black"
                }`}
                data-key={`Y`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'Y'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'Y'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`G#${octave}`, "8n");
                }}
              >
                Y
              </li>
              <li
                id="A"
                className={`${
                  noteProps[`H`]["pressed"]
                    ? "white offset pressed"
                    : "white offset"
                }`}
                data-key={`H`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'H'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'H'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`A${octave}`, "8n");
                }}
              >
                H
              </li>
              <li
                id="A#"
                className={`${
                  noteProps[`U`]["pressed"] ? "black pressed" : "black"
                }`}
                data-key={`U`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'U'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'U'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`A#${octave}`, "8n");
                }}
              >
                U
              </li>
              <li
                id="B"
                className={`${
                  noteProps[`J`]["pressed"]
                    ? "white offset pressed"
                    : "white offset"
                }`}
                data-key={`J`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'J'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'J'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`B${octave}`, "8n");
                }}
              >
                J
              </li>
              <li
                id="C2"
                className={` ${
                  noteProps[`K`]["pressed"] ? "white pressed" : "white"
                }`}
                data-key={`K`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'K'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'K'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`C${octave + 1}`, "8n");
                }}
              >
                K
              </li>
              <li
                id="C#2"
                className={`${
                  noteProps[`O`]["pressed"] ? "black pressed" : "black"
                }`}
                data-key={`O`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'O'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'O'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`C#${octave + 1}`, "8n");
                }}
              >
                O
              </li>
              <li
                id="D2"
                className={`${
                  noteProps[`L`]["pressed"]
                    ? "white offset pressed"
                    : "white offset"
                }`}
                data-key={`L`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'L'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'L'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`D${octave + 1}`, "8n");
                }}
              >
                L
              </li>
              <li
                id="D#2"
                className={`${
                  noteProps[`P`]["pressed"] ? "black pressed" : "black"
                }`}
                data-key={`P`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: 'P'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: 'P'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`D#${octave + 1}`, "8n");
                }}
              >
                P
              </li>
              <li
                id="E2"
                className={`${
                  noteProps[`;`]["pressed"]
                    ? "white offset pressed"
                    : "white offset"
                }`}
                data-key={`;`}
                onMouseOver={() => {
                  if(mousePressed){
                    downHandler({key: ';'})
                  }
                }}
                onMouseLeave={() =>{
                  if(mousePressed){
                    upHandler({key: ';'})
                  }
                }}
                onClick={() => {
                  // synth.triggerAttackRelease(`E${octave + 1}`, "8n");
                }}
              >
                ;
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
