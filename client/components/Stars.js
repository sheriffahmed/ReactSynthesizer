import React, {useState, useEffect} from "react";

function Stars() {

  const starsStyling = {
    animation: `twinkle ${(Math.random() * 5 + 5)}s linear ${(Math.random() * 5 + 5)}s infinite`,
    top: `${Math.random() * window.innerHeight}px`,
    left: `${Math.random() * window.innerWidth}px`
  }

  const [bgStars, setBgStars] =useState([])
  const loadStars = () => {
    // console.log(window)
    for (let i = 0; i < 200; i++) {
        setBgStars(prevState => [...prevState, {class:"star", style: {
          animation: `twinkle ${~~((Math.random() * 5) + ( i === 100? 1 : 3))}s linear ${~~((Math.random() * 5) + ( i === 100? 1 : 3))}s infinite`,
          top: `${Math.random() * window.screen.availHeight}px`,
          left: `${Math.random() * window.screen.availWidth}px`
        }}])
    }
  }
useEffect(()=>{
  loadStars()
}, [])

  return <div className="bg-stars">
  {bgStars.map( (star, id) =>{
// console.log(window);
// console.log(document)

    return <div key={id} className={star.class} style={star.style}
     />
    })}
  </div>;
}

export default Stars;
