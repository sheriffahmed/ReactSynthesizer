import React from 'react'
import HookCcounterThree from './components/HookCcounterThree'
import HookCounterFour from './components/HookCounterFour'

import Navbar from './components/Navbar'
import Synthesizer from './components/Synthesizer'
import Routes from './Routes'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Routes />
      <HookCcounterThree />
      <HookCounterFour /> */}
      <Synthesizer />
    </div>
  )
}

export default App
