import React, {useState} from 'react'

function CounterTest() {

  const initCount = 0
  const [count, setCount] = useState(initCount)
 const incrementFive = () => {
   for(let i=0;i<5;i++){
    setCount(prevState => prevState + 1)
   }
 }

  return (
    <div>
      CounterTest
      Count: {count}

      <button onClick={() => setCount(initCount)}>Reset</button>
      <button onClick={ () => setCount(prevState => prevState + 1)}>Count + 1</button>
      <button onClick={ incrementFive}>Count + 5</button>
      <button onClick={ () => setCount(prevState => prevState -1)}>Count - 1</button>
    </div>
  )
}

export default CounterTest
