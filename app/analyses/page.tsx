"use client";
import { sessionsTableDataType } from "../lib/definitions";
import { useEffect, useState } from "react";
import { SessionsTable } from "../components/SessionsTable";
export default function Analyses() {
  const [sessions, setSessions] = useState([]);
  const [checked, setChecked] = useState(false);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [isLoadigPomodoros, setIsLoadigPomodoros] = useState(true);
  const filterToday = (sessions: []) =>
    setFilteredSessions(
      sessions.filter(
        ({ createdAt }) =>
          new Date(createdAt).toLocaleDateString() ==
          new Date().toLocaleDateString()
      )
    );

  const getAllSessions = async () => {
    const res = await fetch("/api/sessions", { method: "GET" }).then(
      (data) => data
    );
    if (!res.ok) {
      setIsLoadigPomodoros(false);
      throw new Error("Failed to fetch data");
    }
    const data: { all_sessions: [] } = await res.json();
    const { all_sessions } = data;
    setSessions([...all_sessions]);
    filterToday([...all_sessions]);
    setIsLoadigPomodoros(false);
  };
  const filters = (e: string, type: string) => {
    if (e == "on" && type == "today") {
      setChecked(false);
      filterToday(sessions as []);
    } else if (e == "on" && type == "yesterday") {
      setChecked(false);
      const yesterday_date = new Date(
        new Date().setDate(new Date().getDate() - 1)
      );
      setFilteredSessions(
        sessions.filter(
          ({ createdAt }) =>
            new Date(createdAt).toLocaleDateString() ==
            yesterday_date.toLocaleDateString()
        )
      );
    } else if (e == "on" && type == "this_week") {
      setChecked(false);
      const startOfWeek = new Date(
        new Date().setDate(new Date().getDate() - 7)
      );
      const endOfWeek = new Date();
      setFilteredSessions(
        sessions.filter(
          ({ createdAt }) =>
            new Date(createdAt) >= startOfWeek &&
            new Date(createdAt) <= endOfWeek
        )
      );
    } else if (e && type == "costum") {
      setChecked(true);
      setFilteredSessions(
        sessions.filter(
          ({ createdAt }) =>
            new Date(createdAt).toLocaleDateString() ==
            new Date(e).toLocaleDateString()
        )
      );
    } else {
      filterToday(sessions as []);
    }
  };
  useEffect(() => {
    getAllSessions();
    filters("undefined", "undefined");
  }, []);

  return (
    <div className="container">
      <div className="min-h-[100vh] mt-10 flex justify-center flex-col items-center">
        <h1 className="text-4xl my-5 font-bold">Pomodoros Analysis</h1>
        {/* Filtter */}
        <div className=" flex items-center justify-between w-full my-3">
          <div>
            <input
              type="radio"
              name="date"
              onChange={(e) => filters(e.target.value, "today")}
              defaultChecked
              aria-label="Today"
              className="btn btn-sm checked:!bg-blue-500 border-none"
            />
            <input
              type="radio"
              name="date"
              aria-label="Yesterday"
              onChange={(e) => filters(e.target.value, "yesterday")}
              className="btn btn-sm mx-3 checked:!bg-blue-500 border-none"
            />
            <input
              type="radio"
              name="date"
              aria-label="This week"
              onChange={(e) => filters(e.target.value, "this_week")}
              className="btn btn-sm checked:!bg-blue-500 border-none"
            />
          </div>
          <div className="relative">
            <input
              type="date"
              name="date"
              aria-label=""
              className={`p-2 outline-none input input-sm mx-3 border z-index-[1000] ${
                !checked ? "" : "bg-blue-500 text-white"
              }`}
              onChange={(e) => filters(e.target.value, "costum")}
              min={"2024-11-01"}
              max={"2026-01-01"}
            />
            <input
              type="radio"
              name="date"
              aria-label=""
              checked={checked}
              className="btn absolute top-0 left-0 right-0 bottom-0 opacity-[0.2] z-index-[1000]  hidden"
              onChange={(e) => e.preventDefault}
            />
          </div>
        </div>
        {/* <div className="flex flex-wrap justify-center flex- items-center">
            {sessions.map(({createdAt,duration,breakDuration},i)=>{
                return <div key={i} className="m-2 bg-blue-50 p-3 rounded ">
                    <p>Date: {new Date(createdAt).toLocaleString()}</p>
                    <p>Duration: {Math.floor(duration/60)} Minutes</p>
                    <p>break: {Math.floor(breakDuration/60)} Minutes</p>
                </div>
            })}

        </div> */}

        <div className="overflow-x-auto w-full">
          <table className="table table-zebra w-full ">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                <th>Duration</th>
                <th>break</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {filteredSessions?.map(
                (data: sessionsTableDataType, index: number) => {
                  return (
                    <SessionsTable data={data} index={index} key={index} />
                  );
                }
              )}
            </tbody>
          </table>
          {filteredSessions.length == 0 && !isLoadigPomodoros ? (
            <div className="text-slate-500 font-bold py-5 my-5  text-lg text-center  w-full">
              Sorry No Pomodoros This Day{" "}
            </div>
          ) : filteredSessions.length == 0 && isLoadigPomodoros ? (
            <div className=" flex justify-center items-center py-5">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
