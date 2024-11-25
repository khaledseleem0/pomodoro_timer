"use client";
// "dev": "next dev --turbopack",

// import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
export default function TaskPage() {
  const playSessionEndSound = () => {
    const audio = new Audio("/audios/ring.wav"); // Path to your audio file
    audio.play().catch((error) => console.error("Audio play failed:", error));
  };

  const playBreakEndSound = () => {
    const audio = new Audio("/audios/ding.wav"); // Path to your audio file
    audio.play().catch((error) => console.error("Audio play failed:", error));
  };
  const memes = [
    
      "/memes/1.jpeg",
       "/memes/2.jpeg",
       "/memes/3.jpeg",
       "/memes/4.jpeg",
       "/memes/5.jpeg",
       "/memes/6.jpeg",
       "/memes/7.jpeg",
       "/memes/8.jpeg",
       "/memes/9.jpeg",
       "/memes/10.jpeg",

  ];
  
  const breakInterval = () => {
    if (mode == "work"){
      handelBreak()
    }
    setIsRunning(false);
    playBreakEndSound()
    return 0;
  };
  const getMinutes = (seconds: number) => Math.floor(seconds / 60);
  const getSeconds = (seconds: number) => seconds % 60;
  // const pathname = usePathname();
  // const taskId: string = pathname.split("/")[2];
  const [timeLeft, setTimeLeft] = useState(0); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("mode");
  const [sessionNumer, setSessionNumer] = useState(0);
  const [breakTimer, setBreakTimer] = useState(0);
  const [sessionTimer, setSessionTimer] = useState(0);
  const [customTimerIsVisible, setCustomTimerIsVisible] = useState(true);
   // run break
   const handelBreak = () => {
    playSessionEndSound()
    setMode("break");
    setTimeLeft(breakTimer * 60);
    setIsRunning(true); // Pause the timer until started again
  };

  // Restore the saved time if exist
 
  useEffect(() => {
    const savedTime = localStorage.getItem("pomodoro-time");
    const savedMode = localStorage.getItem("pomodoro-mode");
    if (savedTime && savedMode) {
      setTimeLeft(Number(savedTime));
      setIsRunning(false); //Don't start imediatly when data restored!
      setMode(savedMode);
      setCustomTimerIsVisible(false)
    } else{
      setMode("work"); // Switch to work mode

    }
  }, []);

  // Save timeLeft to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pomodoro-time", timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem("pomodoro-mode", mode);

  },[mode])
  useEffect(() => {
    // if paused then return 
    if (!isRunning) {
      return
    };
    // decrease duration
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : breakInterval()));
    }, 1000);

    return () => clearInterval(timer); // Clean up when the timer stops
  }, [isRunning]);

  const createSessionApi = async () => {
    await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryId: "67435accf05e699173e70c36",
        duration: sessionTimer * 60,
        breakDuration: breakTimer * 60,
        date: new Date().toISOString(),
        pauses: [],
      }),
    }).then((data) => data.json());
  };
  const handleNewSession = () => {
    createSessionApi();
    setMode("work"); // Switch to work mode
    setTimeLeft(sessionTimer * 60); // Sets the session timer
    setIsRunning(true); // Start immediately
    setCustomTimerIsVisible(false) // Sets memes to visible and the custom timer hidden while the page is hidden all
    setSessionNumer((session) => (session < 10 ? session + 1 : 0)); //gets the right meme index
  };


  const handelBreakInput = () => {
    // this function returns the value the user refused to enter in break Input 3 x 1
    if (breakTimer === 0) {
      // force the break to 5 minutes
      setBreakTimer(5);
    }
    // return formatted value
    return breakTimer.toString().padStart(2, "0");
  };
  const handelTimerInput = ()=>{
    if (sessionTimer === 0 ) {
      setSessionTimer(25)
    }
    return sessionTimer.toString().padStart(2, "0")
  }


  return (
    <>
      <div className="h-[100vh] flex flex-col justify-center items-center">
        <div className="minutes flex text-[50px] font-bold  flex justify-center items-center">
          <div
            className={`hours-text ${mode == "break" ? "bg-green-100 text-green-500": "bg-blue-100"} p-3 rounded-[12px]`}
          >
            {getMinutes(timeLeft) < 10
              ? "0" + getMinutes(timeLeft).toString()
              : getMinutes(timeLeft)}
          </div>
          <div className={`separator ${mode === "break"? "text-green-500":""}`}>:</div>
          <div className={`hours-text ${mode == "break" ? "bg-green-100 text-green-500": " bg-blue-100"} p-3 rounded-[12px]`}>
            {getSeconds(timeLeft) < 10
              ? "0" + getSeconds(timeLeft)
              : getSeconds(timeLeft)}
          </div>
        </div>
        <div
          className={`btn btn-wide mt-10  ${
            !isRunning
              ? "opacity-[0.1] "
              : "opacity-1 hover:bg-red-500 hover:text-slate-100 "
          }`}
          onClick={() => setIsRunning(false)}
        >
          {" "}
          Puse
        </div>
        <div
          className={`btn btn-wide mt-5 ${
            isRunning
              ? "opacity-[0.1]"
              : " hover:bg-green-500 hover:text-slate-100 "
          }`}
          onClick={() => setIsRunning(true)}
        >
          {" "}
          Resume
        </div>
      </div>
      <div
        className={`fixed z-index-[5000] top-0 select-none left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center flex-col overflow-hidden ${
          (timeLeft === 0 && isRunning === false) && ( mode !== "mode")
            ? "h-[100vh]"
            : "h-[0px]"
        }`}
      >
        <div className="flex w-[400px]  h-[400px] overflow-hidden  relative">
          <div className="w-[400px]  h-[400px] bg-slate-100 flex  rounded-[15px] justify-center items-center flex-col">
            {/* <p className="font-bold">{memes[sessionNumer].phrase}</p> */}
            <div className="flex mt-3">
              <Image
                src={memes[sessionNumer]}
                alt="sada"
                width={200}
                height={200}
              />
            </div>
            <div className="flex">
              <div
                className={`btn w-wide w-full mt-5 bg-blue-500 text-slate-100 mr-3 hover:bg-blue-600`}
                onClick={() => setCustomTimerIsVisible(true)}
              >
                {" "}
                Start New Session
              </div>
              {/* <div className={`btn  w-[100px] mt-5 bg-green-500 text-slate-100`}onClick={handleBreak}> Break</div> */}
            </div>
          </div>
          <div
            className={`  ${
              customTimerIsVisible 
                ? "h-[400px] w-[400px] translate-x-[0px]"
                : "translate-x-[500px] h-[0px]"
            } absolute transition transition-[0.5]  bg-slate-100 flex  rounded-[15px] justify-center items-center flex-col`}
          >
            <p className="font-bold">اختار مستواك</p>
            <div className="flex mt-3">
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  placeholder="25"
                  className="input  px-1 text-center  input-bordered input-lg w-[70px] max-w-xs text-[30px]"
                  defaultValue={0 || undefined}
                  value={handelTimerInput()}
                  onChange={(e) =>
                    (isNaN(Number(e.target.value)) &&
                      Number(e.target.value) > 60) ||
                    Number(e.target.value) > 60 ||
                    isNaN(Number(e.target.value))
                      ? null
                      : setSessionTimer(Number(e.target.value))
                  }
                />
                <span className="block px-1 focus:outline-none font-bold text-lg">
                  :
                </span>
                <input
                  type="text"
                  placeholder="00"
                  className="input px-1 text-center input-bordered input-lg w-[70px] max-w-xs text-[30px]"
                  defaultValue={0 || undefined}
                  value={handelBreakInput()}
                  onChange={(e) =>
                    (isNaN(Number(e.target.value)) &&
                      Number(e.target.value) > 15) ||
                    Number(e.target.value) > 15 ||
                    isNaN(Number(e.target.value))
                      ? null
                      : setBreakTimer(Number(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="flex">
              <div
                className={`btn  btn-wide  mt-5 bg-blue-500 text-slate-100 mr-3 hover:bg-blue-600`}
                onClick={handleNewSession}
              >
                {" "}
                Go
              </div>
              {/* <div
                className={`btn  w-[100px] mt-5 bg-green-500 text-slate-100`}
                onClick={handelCostumBreak}
              >
                Break
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
