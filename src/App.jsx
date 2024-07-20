import { useState,useEffect } from "react";
import "./App.css";

import {cupid,heartBackground,play,pause,happy,sad,audioBackground} from './assets/index.js'

function App() {
  const [answer, setAnswer] = useState(false);
  const [count, setCount] = useState(0);
  const [img, setImage] = useState(happy);
  const [icon,setIcon] = useState(pause)
  const [a, setA] = useState(100);
  const [b, setB] = useState(50);
  const [aud,setAud] = useState(new Audio(audioBackground));
  aud.loop = true;
  
  const handleClickNo = () => {
       
   
    const no = document.getElementById("noButton");
    var x = Math.round(
      Math.random() * Math.abs(window.innerWidth - no.offsetWidth) - 85
    );
    var y = Math.round(
      Math.random() * Math.abs(window.innerHeight - no.offsetHeight) - 48
    );
    no.style.left = `${x}px`;
    no.style.top = `${y}px`;

    const yes = document.getElementById("yesButton");
    yes.style.width = `${a}px`;
    yes.style.height = `${b}px`;

    setA((a) => a + 10);
    setB((b) => b + 10);
    if (count == 25) {
      setImage(sad);
      setAnswer(true);
    } else {
      setCount((count) => count + 1);
    }
  };

   useEffect(() => {
    const requestAudioPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        aud.play(); // Play audio if permission granted
      } catch (error) {
        console.error("Error requesting audio permission or playing audio:", error);
        // Provide message to user if consent denied or error occurred
      }
    };

    requestAudioPermission();
  }, []);

  return (
    <>
      <div className="flex gap-[10px]">
        <button
          className="absolute right-[75px] top-0 m-[10px]"
          onClick={() => {
         
            if (aud.paused &&  !aud.ended  ) {
              aud.loop = true;
              aud.play();
              setIcon(pause)
            } else {
              aud.pause();
              setIcon(play)
            }
          }}
        >
        <img src={icon} className="w-[50px] h-[50px]"></img>
       
          
        </button>
        {/* <button
          className="absolute right-0 top-0 m-[10px]"
          onClick={() => {
            audio.loop = false;
            audio.pause();
            
          }}
        >
         
        </button> */}
      </div>
      {answer ? (
        <div className="h-screen  flex flex-col justify-center items-center bg-[#fcfefc]">
          <img src={img} className="w-[300px] h-[500px] rounded-[50px]"></img>
        </div>
      ) : (
        <div
          className={`flex flex-col justify-center items-center z-[1] h-screen bg-[url(${heartBackground})] bg-no-repeat bg-center `}
     
        >
          <img
            src={cupid}
            className="w-[200px] h-[200px] m-[25px]"
          ></img>
          <h2 className="text-black text-5xl">Will you go out with me?</h2>
          <div className="flex gap-[25px] m-10">
            <button
              id="yesButton"
              className={`bg-yellow-300 rounded-lg w-[${a}px] h-[${b}px]  text-2xl hover:bg-yellow-200`}
              onClick={() => setAnswer((answer) => true)}
            >
              Yes
            </button>
            <button
              id="noButton"
              className={` bg-purple-300 rounded-lg w-[100px] h-[50px] text-2xl hover:bg-purple-200 `}
              onClick={() => handleClickNo()}
              onMouseOver={() => {
                handleClickNo()
            
                
              }}
            >
              No
            </button>
          </div>
        
        </div>
      )}

   
    </>
  );
}

export default App;
