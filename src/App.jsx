import { useCallback, useEffect, useState,useRef } from 'react'


function App() {
  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setpassword] = useState("");

  //using useRef
 
  const passwordRef = useRef(null)

  const passwordGenerator =useCallback(() =>{
    let pass ="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";


    if(numberAllowed)
      {
       str = str + "0123456789";
      }
    
      if(charAllowed)
      {
       str = str + "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
      }
    
    
      for (let index = 1; index <= length; index++) {
       
        let char = Math.floor(Math.random() * str.length + 1) ;
    
        pass += str.charAt(char);
    
        
      }
      setpassword(pass);
  }
  ,[ length,numberAllowed,charAllowed ,setpassword])


  const copytoClipboard = useCallback(() =>
  { 
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select();
  },[password])


  useEffect(()=>{
    passwordGenerator();  
  },[ length,numberAllowed,charAllowed,passwordGenerator])

 
  return (
    <>
     <div className=' w-full max-w-md  mx-auto shadow-md rounded-lg  px-4 py-3 my-8  text-green-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>

        <input
         type="text"
         value={password}
         className="outline-none w-full py-1 px-3"  
         placeholder='Password'
         readOnly
         ref ={passwordRef}
         ></input>

         <button 
         onClick={copytoClipboard}
         className='outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0'>copy
         </button>

      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        
        type = "range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'    
        onChange={(e) =>{setLength(e.target.value)}}
        >
       </input>
          <label>Length:{length}</label>
      
      </div>
      <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={() => {
            setNumberAllowed((prev) => !prev)
          }}
           name=""
          id="" />
          <label htmlFor="number">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={() => {
            setCharAllowed((prev) => !prev)
          }}
           name=""
          id="" />
          <label htmlFor="charInput">Character</label>
        </div>

      </div>
     </div>
     
    </>
  )
}

export default App
