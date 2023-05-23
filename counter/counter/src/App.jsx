import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>React Counter App</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          Increment+
        </button>
      </div>
      <p>{ count}</p>
       <div>
        <button onClick={() => setCount((count) => count - 1)}>
          Decrement-
        </button>
      </div>
    </>
  )
}
export default App
