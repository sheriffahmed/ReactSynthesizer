import React, { useState, useEffect } from "react";
import * as Tone from "tone";

export default Synthesizer;
function Synthesizer() {
  const startingOctave = 4;
  const func = () => {};

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
  let synth = new Tone.PolySynth(Tone.Synth).toDestination();
  // synth.debug = true
  // States
  const [noteProps, setNoteProps] = useState(keyMappings);
  const [pressedKeys, setPressedKeys] = useState({});
  const [octave, setOctave] = useState(startingOctave);
  const [buttonAni, setButtonAni] = useState(false);

  // Handlers
  //   const buttonBubbles =() =>{
  //     // e.preventDefault;

  //     // setButtonAni(prevState=> false)
  //   // e.target.classList.remove('animate');
  //   setButtonAni(prevState=> true)

  //   // e.target.classList.add('animate');
  //   // setTimeout(function(){
  //   //   // e.target.classList.remove('animate');
  //   //   setButtonAni(prevState=> false)
  //   // },700);
  // }
  const increaseOctave = () => {
    if (octave < startingOctave + 2) {
      // buttonBubbles()
      setOctave((prevState) => prevState + 1);
    }
  };
  const decreaseOctave = () => {
    if (octave > startingOctave - 2) {
      // buttonBubbles()
      setOctave((prevState) => prevState - 1);
    }
  };



  const downHandler = async ({ key }) => {
    const keyPress = String(key).toUpperCase();
    if (noteProps[keyPress]) {
      if (!noteProps[keyPress].pressed) {
        await Tone.start();
        synth.triggerAttackRelease(
          `${noteProps[keyPress].note + (noteProps[keyPress].octave + octave)}`,
          "8n"
        );
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
    if (noteProps[keyPress]) {
      setNoteProps((prevState) => {
        let newState = { ...prevState };
        newState[keyPress].pressed = false;
        return newState;
      });
    }
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
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
      synth = new Tone.PolySynth(Tone.Synth).toDestination();
      setTimeout(function(){
        // e.target.classList.remove('animate');
        setButtonAni(prevState=> false)
      },700);
    };
  }, [octave, buttonAni]); // Component will update when octave state changes

  return (
    <div>
      Synthesizer
      {/* <br />
      <br />
      <br />
      <br /> */}
      <button onClick={() => synth.triggerAttackRelease(`C${octave}`, "8n")}>
        {" "}
        C
      </button>
      {/* <div className="button-container"> */}
        <button className={buttonAni ?`button-glow animate` : `button-glow`} onClick={() =>increaseOctave()}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          +1 Octave
        </button>
        <button className={buttonAni ?`button-glow animate` : `button-glow`} onClick={ () => decreaseOctave()}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          -1 Octave
        </button>
        <button
          className={buttonAni ?`button-glow animate` : `button-glow`}
      onClick={() => setOctave(startingOctave)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Reset Octave
        </button>
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
        <ul id="keyboard">
          <li
            id="C"
            className={` ${
              noteProps[`A`]["pressed"] ? "white pressed" : "white"
            }`}
            data-key={`A`}
            onMouseDown={() => {
              if (!noteProps[`A`]["pressed"]) {
                synth.triggerAttackRelease(`C${octave}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`A`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`A`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`W`]["pressed"]) {
                synth.triggerAttackRelease(`C#${octave}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`W`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`W`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`S`]["pressed"]) {
                synth.triggerAttackRelease(`D${octave}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`S`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`S`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`E`]["pressed"]) {
                synth.triggerAttackRelease(`D#${octave}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`E`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`E`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`D`]["pressed"]) {
                synth.triggerAttackRelease(`E${octave}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`D`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`D`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`F`]["pressed"]) {
                synth.triggerAttackRelease(`F${octave}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`F`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`F`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`T`]["pressed"]) {
                synth.triggerAttackRelease(`F#${octave}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`T`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`T`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`G`]["pressed"]) {
                synth.triggerAttackRelease(`G${octave}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`G`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`G`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`Y`]["pressed"]) {
                synth.triggerAttackRelease(`G#${octave}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`Y`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`Y`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`H`]["pressed"]) {
                synth.triggerAttackRelease(`A${octave}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`H`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`H`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`U`]["pressed"]) {
                synth.triggerAttackRelease(`A#${octave}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`U`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`U`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`J`]["pressed"]) {
                synth.triggerAttackRelease(`B${octave}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`J`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`J`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`K`]["pressed"]) {
                synth.triggerAttackRelease(`C${octave + 1}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`K`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`K`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`O`]["pressed"]) {
                synth.triggerAttackRelease(`C#${octave + 1}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`O`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`O`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`L`]["pressed"]) {
                synth.triggerAttackRelease(`D${octave + 1}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`L`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`L`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`P`]["pressed"]) {
                synth.triggerAttackRelease(`D#${octave + 1}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`P`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`P`].pressed = false;
                return newState;
              })
            }
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
            onMouseDown={() => {
              if (!noteProps[`;`]["pressed"]) {
                synth.triggerAttackRelease(`E${octave + 1}`, "8n");

                setNoteProps((prevState) => {
                  let newState = { ...prevState };
                  newState[`;`].pressed = true;
                  return newState;
                });
              }
            }}
            onMouseUp={() =>
              setNoteProps((prevState) => {
                let newState = { ...prevState };
                newState[`;`].pressed = false;
                return newState;
              })
            }
            onClick={() => {
              // synth.triggerAttackRelease(`E${octave + 1}`, "8n");
            }}
          >
            ;
          </li>
        </ul>
      </div>
    </div>
  );
}
