"use client";
    // "dev": "next dev --turbopack",

// import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
export default function TaskPage() {
  const memes = [
    {
      img:"/memes/1.jpeg",
      phrase: "🙂‍↔️ عاش فشخ يسطا",
    },
    {
      img:"/memes/2.jpeg",
      phrase: "😳 انت ناوي على الامتياز ولا ايه : ",
    },
    {
      img:"/memes/3.jpeg",
      phrase: "🤫 كسم الدكتور احا",
    }
  ]
  // const pathname = usePathname();
  // const taskId: string = pathname.split("/")[2];
  const [timeLeft, setTimeLeft] = useState(10); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(true);
  const [mode,setMode] = useState("work")
  const [sessionNumer, setSessionNumer] = useState(0)
  // useEffect(() => {
  //   if (seconds !== undefined) {
  //     const totalSeconds = seconds; // Convert minutes to seconds
  //     const m = Math.floor((totalSeconds % 3600) / 60); // Calculate minutes
  //     const s = totalSeconds % 60; // Calculate remaining seconds

  //     setMinutes(m);
  //     setSeconds(s);
  //     console.log(minutes)
  //   }
  // }, [minutes]); // Recalculate if dbMinutes changes
  // setInterval(() => {
  //   setMinutes(minutes - 60);
  //   console.log(minutes)

  // }, 1000);
 // Start or stop the timer
 useEffect(() => {
  const savedTime = localStorage.getItem('pomodoro-time');
  if (savedTime) setTimeLeft(Number(savedTime)); // Restore the saved time
}, []);

// Save timeLeft to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem('pomodoro-time', timeLeft.toString());
  if(timeLeft == 0){
    setSessionNumer(sessionNumer+1)
  }
}, [timeLeft,sessionNumer]);

 
 useEffect(() => {
  if (!isRunning) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    
  }, 1000);

  return () => clearInterval(timer); // Clean up when the timer stops
}, [isRunning]);
const getMinutes = (seconds:number) => Math.floor(seconds / 60);
const getSeconds = (seconds:number) => seconds % 60;

const handleAgain = () => {
  setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60); // Restart based on the current mode
  setIsRunning(true); // Start immediately
};
const handleBreak = () => {
  setMode('break'); // Switch to break mode
  setTimeLeft(5 * 60); // Set timer to 5 minutes
  setIsRunning(true); // Pause the timer until started again
};
return (
    <>
        {/* <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{'--value': hours }}></span>
            </span>
            hours
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ '--value': minutes }}></span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ '--value': seconds }}></span>
            </span>
            sec
          </div>
        </div> */}

{/* <div className="relative w-40 h-40">
  <svg className="w-full h-full" viewBox="0 0 100 100">
    {/* <!-- Background circle --> */}
    {/* <circle
      className="text-gray-200 stroke-current"
      stroke-width="10"
      cx="50"
      cy="50"
      r="40"
      fill="transparent"
    ></circle> */}
    {/* <!-- Progress circle --> */}
    {/* <circle
      className="text-indigo-500  progress-ring__circle stroke-current"
      stroke-width="10"
      stroke-linecap="round"
      cx="50"
      cy="50"
      r="40"
      fill="transparent"
      stroke-dasharray="251.2" 
      stroke-dashoffset="calc(251.2 - (251.2 * 70) / 100)"
    ></circle>
     */}
    {/* <!-- Center text --> */}
    {/* <text x="50" y="50" font-family="Verdana" font-size="12" text-anchor="middle" alignment-baseline="middle">70%</text> */}

  {/* </svg>
   */}

<div className="h-[100vh] flex flex-col justify-center items-center">
<div className="minutes flex text-[50px] font-bold  flex justify-center items-center">
     <div className="minutes-text bg-blue-100 p-3 rounded-[12px]
     ">
       {getMinutes(timeLeft)  < 10 ? "0"+getMinutes(timeLeft).toString()  : getMinutes(timeLeft) }
     </div>
     <div className="separator">
      :
     </div>
         <div className="hours-text bg-blue-100 p-3 rounded-[12px]">
         {getSeconds(timeLeft) < 10 ? "0"+getSeconds(timeLeft): getSeconds(timeLeft)}
       </div>
      </div>
      <div className={`btn btn-wide mt-10  ${!isRunning? "opacity-[0.1] ":"opacity-1 hover:bg-red-500 hover:text-slate-100 "}`} onClick={()=>setIsRunning(false)}> Puse</div>
      <div className={`btn btn-wide mt-5 ${isRunning ? "opacity-[0.1]":" hover:bg-green-500 hover:text-slate-100 "}`} onClick={()=>setIsRunning(true)}> Resume</div>
     </div>
     <div className={`absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center overflow-hidden ${timeLeft !== 0 ? "h-[0px]": "h-[100vh]"}`}>
      <div className="w-[400px] h-[400px] bg-slate-100 flex  rounded-[15px] justify-center items-center flex-col">
        <p className="font-bold">{memes[sessionNumer].phrase}</p>
       <div className="flex mt-3">
        <Image src={memes[sessionNumer].img} alt="sada" width={200} height={200}/>
       </div>
      <div className="flex">
         <div className={`btn w-[100px] mt-5 bg-blue-500 text-slate-100 mr-3`} onClick={handleAgain}> Again</div>
        <div className={`btn  w-[100px] mt-5 bg-green-500 text-slate-100`}onClick={handleBreak}> Break</div>
      </div>
      </div>

     </div>
    </>
  );
}
