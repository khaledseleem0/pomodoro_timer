"use client"
// import { AddTask } from "../components/AddTask"
import { Task } from "../components/Task"
import { useEffect, useState } from "react"
type TaskType = {
    title: string,
    due_date: string,
    duration: number,
    details: string,
    _id: string,
}
export default function Home(){
  
    const [add,setAdd]= useState("")
    const [allTaks,setAllTasks]= useState([])
    useEffect(()=>{
        async function getTasks(){
                try {
                    const res = await fetch("/api",{method:"GET"}).then((data)=>{
                        return data.json()
                 })
                  setAllTasks([...res.all_tasks] as [])  
                } catch (error) {
                    
                    console.log("Some Error in Fetching",error)
                }
        }
        getTasks()
    },[])
    const addTaskFunc = async()=>{
        console.log(add)
        // fetch("",{
        //     method:"POST",
        //     headers:{
        //         ""
        //     }
        // })
    }
    

    return <>

    <div>
        <div className={`bg-slate-200  min-h-[100vh] pt-[40vh] flex justify-center items-center flex-col`}>
        <h1 className="mb-4">Hi, developer </h1>
        <>
    <div className="  flex flex-col">
        <input className="input input-bordered w-full max-w-xs"  type="text" placeholder="Add Task" onChange={(e)=>setAdd(e.target.value)} />
        <button className=" my-3 btn btn-wide" onClick={addTaskFunc}>Add</button>
  
   </div>
    </>
    <div className="flex flex-col items-left justify-left">

    {allTaks?.map((taskDetails:TaskType,i)=>{
                return <div className="my-2" key={i}> <Task task={taskDetails}/></div>
           })}
    </div>
    

        </div>
    </div>
</>}