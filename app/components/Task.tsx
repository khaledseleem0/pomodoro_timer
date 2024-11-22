
// Type '{}' is missing the following properties from type 'TaskID': title, due_date, duration, details, _id
type TaskType = {
  title: string,
  duration: number,
  details: string,
  _id: string,
  }
interface TaskProps{
  task:TaskType
}
import { useRouter } from "next/navigation";
export const Task: React.FC<TaskProps> = ({task}) => {
  const { title, _id, details, duration }:TaskType = task;
  const router = useRouter()
  return (
    <>
      <div
        tabIndex={0}
        className="collapse  border-base-300 bg-slate-100 select-none max-w-[400px] border z-index-[-1] "
      >
        <div className="collapse-title text-md font-medium flex items-center z-index-[-1] ">
          <div className="form-control flex flex-row items-center ">
            <label className="cursor-pointer label">
              <input type="checkbox" className="checkbox checkbox-info" />
            </label>
            <p className="label-text block font-bold pl-3 capitalize">
              {" "}
              {title}
            </p>
          </div>
        </div>

        <div className="collapse-content z-index-[44841]">
          <li className="text-slate-500 text-sm">{details}</li>
          <div
          onClick={()=>router.replace("/tasks/" + _id)}
            className=" btn  my-3  bg-blue-100 text-blue-500 hover:text-slate-100 hover:bg-blue-500 btn-wide w-full"          >
            {" "}
            Start This Shit{" "}
          </div>
          <p className="text-slate-500 text-sm pt-2">
            <span>Duration:</span>
            <span className="font-bold pl-2">{duration} minutes</span>
          </p>


        </div>
      </div>
    </>
  );
};
