import { useEffect, useState } from "react"
import { FaRegClock, FaList, FaInfo, FaExpandAlt, FaCheck, FaTrashAlt, FaTimes, FaCaretUp, FaCaretDown } from 'react-icons/fa'
const Misc = () => {
    const [application, setApplication] = useState()
    const [fullScreen, setFullScreen] = useState(false)

    const handleFullScreen = () => {
        var elem = document.documentElement
        if (elem.requestFullscreen) {
            elem.requestFullscreen()
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen()
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen()
        }
    }
    const CloseFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen()
        }
    }
    const handleAppChange = (app) => {
        console.log(app, application)
        setApplication(state => {
            if (state === app) return ("")
            else return (app)

        })
    }
    useEffect(() => {
        console.log("APP CHANGED TO", application)
    }, [application])
    return (
        <div className="absolute top-5 right-5  flex gap-3 text-[1.4rem] text-yellow-50 z-20">
            <button onClick={() => handleAppChange("timer")}>{application === 'timer' ? <FaTimes className="text-red-500" /> : <FaRegClock />}</button>
            <button onClick={() => handleAppChange("todolist")}>{application === 'todolist' ? <FaTimes className="text-red-500" /> : <FaList />}</button>
            <button onClick={() => handleAppChange("info")}>{application === 'info' ? <FaTimes className="text-red-500" /> : <FaInfo />}</button>
            <button onClick={() => {
                if (fullScreen) CloseFullScreen()
                else handleFullScreen()
                setFullScreen((x) => !x)
            }}><FaExpandAlt /></button>

            {application && <div className="p-3 absolute top-10 right-0 bg-yellow-50 rounded-xl bg-opacity-95 ">
                <FocusedWindow application={application} />
            </div>}
        </div>
    )
}
const FocusedWindow = ({ application }) => {
    switch (application) {
        case "timer": return <Timer />
        case "todolist": return <List />
        case "info": return <Info />
        default: return <></>
    }
}
// =====================================================
// TIMER ===============================================
// =====================================================
const Timer = () => {
    const [time, setTime] = useState(30)
    const handleChangeTime = (action) => {
        if (action === "up") setTime(time + 10)
        else setTime(state=>{
            if(state<=0)return state
            else return state-10
        })
    }
    const startTimer = () => {

    }
    return (
        <div className="text-yellow-900">
            <div className="flex p-0 items-center">
                <span className="border border-yellow-700 p-2 min-w-[50px] text-center">{time}</span>
                <div className="flex flex-col">
                    <button className="text-[2rem]" onClick={() => handleChangeTime("up")}><FaCaretUp /></button>
                    <button className="text-[2rem]" onClick={() => handleChangeTime("down")} ><FaCaretDown /></button>
                </div>
            </div>
            <button onClick={startTimer} className='bg-yellow-500 p-1 rounded-md'>
                Start
            </button>
        </div>
    )
}

// =====================================================
// LIST ================================================
// =====================================================
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
    const deleteTask = (id) => {
        setTasks(state => {
            let ar = [...state]
            ar.splice(id, 1)
            localStorage.setItem("lofiTasks", JSON.stringify([...ar]))
            return ar
        })
    }

    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem("lofiTasks")) || [])
    }, [])

    return (
        <div>
            <div className="flex text-black mb-2 border-1 border-yellow-500 rounded-t-lg overflow-hidden">
                <input className="p-2 rounded-tl-lg outline-0" value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { addNewTask() } }} placeholder="Enter New Task" />
                <button className="p-1 bg-yellow-800 text-yellow-100 " onClick={addNewTask}>Add</button>
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
            <div className="bg-yellow-50 border-yellow-500 border-2 aspect-square min-w-[30px] mr-2 flex justify-center items-center" onClick={() => toggleTask(task.id)}>
                {task.completed && <FaCheck />}
            </div>
            <span className="text-[1.2rem] flex-grow" style={{ textDecoration: `${task.completed ? 'line-through' : 'none'}` }}>{task.title}</span>
            <button className="text-orange-500 grow-0" onClick={() => deleteTask(task.id)}><FaTrashAlt /></button>
        </li>
    )
}

const Info = () => {
    return (
        <div className="w-max text-yellow-800 ">
            <h1 className="text-lg font-semi">Study Cafe </h1>
            <p className="text-xs ">By Patrick V.</p>
            <p className="text-xs mb-2">In development</p>
            <p className="text-sm">e - change background</p>
            {/* <p className="text-sm"> Desktop only</p> */}
            {/* <p className="text-sm">e - change background</p> */}
        </div>
    )
}
export default Misc