import {getLocation} from './services/locationService.js'

function App() {
  return (
    <>
      <p>Test</p>
      {getLocation()}
    </>
  )
}

export default App
