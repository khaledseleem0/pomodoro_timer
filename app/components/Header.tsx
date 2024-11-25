import Link from "next/link";

export function Header(){
    return<>
        <header className="flex justify-between font-bold p-4">
        <div className=""><Link href={"/analyses"} className="text-indigo-500 bg-indigo-100 px-2 py-1 rounded pointer">Pomodoros</Link></div>
        <div className=""><Link href={"/session"} className="text-indigo-500 bg-indigo-100 px-2 py-1 rounded pointer">session</Link></div>
             
        </header>

    </>
}