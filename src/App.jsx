
import { useState, useCallback , useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [passowrd, setPassword] = useState();
  const passwordRef= useRef();
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "{}()+%$#^&*#@!`'/|";
    for (let i = 1; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pass);
  }, [ length, numAllowed, charAllowed, setPassword ])

  const copyPasswordToClipBoard = useCallback(() =>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(passowrd);
  }, [passowrd])
  useEffect(() =>{
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);
  return (
    <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-2 py-4 m-8 text-orange-500 bg-gray-500 text-2xl">
      <h1 className='text-white text-center my-2'>Passowrd Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden my-4'>
        <input type="text" name="" id="" value={passowrd} className='outline-none w-full py-1 px-3' placeholder='Passowrd' readOnly ref ={passwordRef} />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipBoard}>Copy</button>
      </div>
      <div className='flex items-center gap-x-5'>
        <div className='flex items-center gap-x-2'>
          <input
            type="range"
            min={8}
            max={30}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-2'>
          <input type="checkbox" name="" defaultChecked={numAllowed} id="numberInput" onChange={() => {
            setNumAllowed((prev) => !prev);
          }} />
          <label htmlFor="">Numbers</label>
        </div>
        <div className='flex items-center gap-x-2 text-3xlg'>
          <input type="checkbox" name="" defaultChecked={charAllowed} id="characterAllowed" onChange={() => {
            setCharAllowed((prev) => !prev) ;
          }} />
          <label>Characters</label>
        </div>
      </div>

    </div>
  )
}

export default App
