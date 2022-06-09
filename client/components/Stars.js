import React, {useState, useEffect} from "react";

function Stars() {

  const starsStyling = {
    animation: `twinkle ${(Math.random() * 5 + 5)}s linear ${(Math.random() * 5 + 5)}s infinite`,
    top: `${Math.random() * window.innerHeight}px`,
    left: `${Math.random() * window.innerWidth}px`
  }

  const [bgStars, setBgStars] =useState([])
  const loadStars = () => {
    // let starsArr= []
    console.log(window)
    for (let i = 0; i < 200; i++) {
      // let star =
        // stars.push({className: "star"})
        setBgStars(prevState => [...prevState, {class:"star", style: {
          animation: `twinkle ${~~((Math.random() * 5) + ( i === 100? 1 : 3))}s linear ${~~((Math.random() * 5) + ( i === 100? 1 : 3))}s infinite`,
          top: `${Math.random() * window.screen.availHeight}px`,
          left: `${Math.random() * window.screen.availWidth}px`
        }}])
        // className="star"></div>
      // document.body.append(star);
      // return stars
    }
  }
useEffect(()=>{
  loadStars()
}, [])

  return <div className="bg-stars">
    {/* <h1>Stars</h1> */}
{/* {loadStars()} */}
  {bgStars.map( (star, id) =>{
    // star.style = starsStyling
console.log(window);
console.log(document)
// animation: `twinkle ${(~~(Math.random() * 5) + 5)}s linear ${(~~(Math.random() * 5) + 5)}s infinite`,

    return <div key={id} className={star.class} style={star.style}
      // return <div key={id} className="star" style={
      // {
      //   animation: `twinkle ${1}s linear ${1}s infinite`,
      //   top: `${Math.random() * window.screen.availHeight}px`,
      //   left: `${Math.random() * window.screen.availWidth}px`
      // }
     />
    })}
  </div>;
}

export default Stars;
