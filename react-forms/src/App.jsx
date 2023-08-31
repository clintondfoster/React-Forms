import { useState } from 'react'
import SignUpForm from './components.jsx/SignUpForm';
import Authenticate from './components.jsx/Authenticate';
import './App.css'


function App() {

  const [token, setToken] = useState(null);



  return (
    <div className="App">
      <SignUpForm token={token} setToken={setToken}/>
      <Authenticate token={token} setToken={setToken}/>
    </div>
  );
}

export default App
