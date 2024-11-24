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
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(true);
  const [mode,setMode] = useState("work")
  const [sessionNumer, setSessionNumer] = useState(0)
  const [breakTimer,setBreakTimer] = useState(0);
  const [sessionTimer,setSessionTimer] = useState(0);
  const[customTimerIsVisible,setCustomTimerIsVisible] = useState(false)
 useEffect(() => {
  const savedTime = localStorage.getItem('pomodoro-time');
  if (savedTime) setTimeLeft(Number(savedTime)); // Restore the saved time
}, []);

// Save timeLeft to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem('pomodoro-time', timeLeft.toString());
 
}, [timeLeft]);

 
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
  setTimeLeft(mode === 'work' ?  25* 60  : 5 * 60); // Restart based on the current mode
  setSessionNumer((session)=> (session < 2) ? session + 1 : 0)
  setIsRunning(true); // Start immediately
};


const createSessionApi = async()=>{
  const res = await fetch("/api/sessions",{method:"POST",headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        categoryId:"67435accf05e699173e70c36",
        duration:sessionTimer*60,
        breakDuration:breakTimer*60,
        date: new Date().toISOString(),
        pauses: [],
    })}).then(data=>data.json())
     res;
  console.log(res)
}
const handleNewSession = () => {
  createSessionApi()
  setMode('work'); // Switch to break mode
  setTimeLeft(mode === 'work' ?  sessionTimer * 60  : breakTimer *60); // Restart based on the current mode
  setSessionNumer((session)=> (session < 2) ? session + 1 : 0)
  setIsRunning(true); // Start immediately
};
const handelCostumBreak = () => {
  setMode('break');
  setTimeLeft(breakTimer*60); //
  setIsRunning(true); // Pause the timer until started again

}
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
     {/* <div className={`absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center overflow-hidden ${timeLeft !==  0? "h-[0px]": "h-[100vh]"}`}>

     </div> */}
     <div className={`absolute z-index-[5000] top-0 select-none left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center flex-col overflow-hidden ${timeLeft !==  0? "h-[0px]": "h-[100vh]"}`}>
<div className="flex w-[400px]  h-[400px] overflow-hidden  relative">
<div className="w-[400px]  h-[400px] bg-slate-100 flex  rounded-[15px] justify-center items-center flex-col">
        <p className="font-bold">{memes[sessionNumer].phrase}</p>
       <div className="flex mt-3">
        <Image src={memes[sessionNumer].img} alt="sada" width={200} height={200}/>
       </div>
      <div className="flex">
         <div className={`btn w-wide w-full mt-5 bg-blue-500 text-slate-100 mr-3 hover:bg-blue-600`} onClick={()=>setCustomTimerIsVisible(true)}> Start New Session</div>
        {/* <div className={`btn  w-[100px] mt-5 bg-green-500 text-slate-100`}onClick={handleBreak}> Break</div> */}
      </div>
      </div>
      <div className={`  ${customTimerIsVisible ? "h-[400px] w-[400px] translate-x-[0px]":"translate-x-[500px] h-[0px]" } absolute transition transition-[0.5]  bg-slate-100 flex  rounded-[15px] justify-center items-center flex-col`}>
        <p className="font-bold">يلا نبدأ تاني ؟</p>
       <div className="flex mt-3">
        <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="25"
          className="input  px-1 text-center  input-bordered input-lg w-[70px] max-w-xs text-[30px]"
          defaultValue={0 || undefined}
          value={sessionTimer.toString().padStart(2,"0")}
          onChange={(e)=> isNaN(Number(e.target.value)) && Number(e.target.value) > 60|| Number(e.target.value) > 60 || isNaN(Number(e.target.value))? null : setSessionTimer(Number(e.target.value))}
          /> 
          <span className="block px-1 focus:outline-none font-bold text-lg">:</span> 
        <input
          type="text"
          placeholder="00"
          className="input px-1 text-center input-bordered input-lg w-[70px] max-w-xs text-[30px]"
          defaultValue={0 || undefined}
          value={breakTimer.toString().padStart(2,"0")}
          onChange={(e)=> isNaN(Number(e.target.value)) && Number(e.target.value) > 15 || Number(e.target.value) > 15 || isNaN(Number(e.target.value)) ? null : setBreakTimer(Number(e.target.value))}

          />
       </div>
        </div>
      <div className="flex">
         <div className={`btn w-[100px] mt-5 bg-blue-500 text-slate-100 mr-3 hover:bg-blue-600`} onClick={handleNewSession}> Go</div>
        <div className={`btn  w-[100px] mt-5 bg-green-500 text-slate-100`}onClick={handelCostumBreak}> Break</div>
      </div>
      </div>

</div>
      </div>
    </>
  );
}
