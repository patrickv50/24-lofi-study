import { useEffect, useState } from "react"
import { FaRegClock, FaList, FaInfo, FaExpandAlt, FaCheck,FaTrashAlt } from 'react-icons/fa'
const Misc = () => {
    const [application, setApplication] = useState()
    return (
        <div className="absolute top-5 right-5  flex gap-3 text-[1.4rem] text-yellow-50 z-20">
            <button onClick={() => setApplication("timer")}><FaRegClock /></button>
            <button onClick={() => setApplication("todolist")}><FaList /></button>
            <button><FaInfo /></button>
            <button><FaExpandAlt /></button>

            <div className="p-3 absolute top-10 right-0 bg-yellow-50 rounded-xl bg-opacity-95 ">
                <FocusedWindow application={application} />
            </div>
        </div>
    )
}
const FocusedWindow = ({ application }) => {
    switch (application) {
        case "timer": return <Timer />
        case "todolist": return <List />
        default: return <></>
    }
}

const Timer = () => {
    return (
        <div className="text-yellow-900">
            TIMER
        </div>
    )
}

const List = () => {
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState("")

    const addNewTask = () => {
        console.log("ADD")
        let newTask = {
            id: tasks.length,
            title: task,
            completed: false
        }
        setTasks(state => [...state, newTask])
        localStorage.setItem("lofiTasks", JSON.stringify([...tasks, newTask]))
        setTask("")
    }

    const toggleTask = (id) => {

        setTasks(state => {
            let ar = [...state]
            ar[id].completed = !ar[id].completed
            localStorage.setItem("lofiTasks", JSON.stringify([...ar]))
            return ar
        })
    }
    const deleteTask = (id) =>{
        setTasks(state=>{
            let ar=[...state]
            ar.splice(id,1)
            localStorage.setItem("lofiTasks", JSON.stringify([...ar]))
            return ar
        })
    }

    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem("lofiTasks")) || [])
    }, [])

    return (
        <div>
            <div className="flex text-black mb-2">
                <input className="p-2 rounded-tl-lg" value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { addNewTask() } }} placeholder="Enter New Task" />
                <button className="p-1 bg-yellow-800 text-yellow-100 rounded-tr-lg" onClick={addNewTask}>Add</button>
            </div>
            <ul className="overflow-y-scroll max-h-[400px]">
                {tasks.map((task, index) => (
                    <Task task={task} key={index} toggleTask={toggleTask} deleteTask={deleteTask} />

                ))}
            </ul>
        </div>
    )
}
const Task = ({ task, toggleTask, deleteTask }) => {
    return (
        <li className=" text-yellow-900 p-1 mb-1 rounded flex items-center">
            <div className="bg-yellow-50 aspect-square min-w-[30px] mr-2 flex justify-center items-center" onClick={() => toggleTask(task.id)}>
                {task.completed && <FaCheck />}
            </div>
            <span className="text-[1.2rem] flex-grow" style={{ textDecoration: `${task.completed ? 'line-through' : 'none'}` }}>{task.title}</span>
            <button className="text-orange-500 grow-0" onClick={()=>deleteTask(task.id)}><FaTrashAlt/></button>
        </li>
    )
}
export default Misc