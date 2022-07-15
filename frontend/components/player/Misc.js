import { useEffect, useState } from "react"
import { FaRegClock, FaList, FaInfo, FaExpandAlt, FaCheck, FaTrashAlt, FaTimes, FaCaretUp, FaCaretDown, FaPlus } from 'react-icons/fa'
import { GoTriangleDown } from "react-icons/go"
import useFadeIn from "../hooks/useFadeIn"
const Misc = () => {
    const [application, setApplication] = useState("timer")
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
            <button className="p-[3px]" onClick={() => handleAppChange("timer")}>
                {application === 'timer' ? <FaTimes className="text-red-500" /> : <FaRegClock />}
            </button>
            <button className="p-[3px]" onClick={() => handleAppChange("todolist")}>
                {application === 'todolist' ? <FaTimes className="text-red-500" /> : <FaList />}
            </button>
            <button className="p-[3px]" onClick={() => handleAppChange("info")}>
                {application === 'info' ? <FaTimes className="text-red-500" /> : <FaInfo />}
            </button>
            <button className="p-[3px]" onClick={() => {
                if (fullScreen) CloseFullScreen()
                else handleFullScreen()
                setFullScreen((x) => !x)
            }}><FaExpandAlt /></button>

            <div className="p-3 absolute top-10 right-0 " style={{ opacity: `${application ? '.9' : '0'}` }} >
                <FocusedWindow application={application} />
            </div>
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
        else setTime(state => {
            if (state <= 0) return state
            else return state - 10
        })
    }
    const [visible] = useFadeIn()
    const startTimer = () => {

    }
    return (
        <div className="text-yellow-900 flex-wrap bg-yellow-50 p-2 min-w-[200px] aspect-square content-center items-center flex justify-center rounded-lg duration-300" style={{ opacity: `${visible ? '1' : '0'}` }}>
            <h1 className="mb-2">Ready,set,focus!</h1>
            <div className="flex p-0 items-center ">
                <span className="border border-yellow-700 p-2 min-w-[50px] text-center">{time}</span>
                <div className="relative min-h-[55px] min-w-[50px] ">
                    <button className="text-[2rem] absolute top-0" onClick={() => handleChangeTime("up")}><FaCaretUp /></button>
                    <button className="text-[2rem] absolute bottom-0" onClick={() => handleChangeTime("down")} ><FaCaretDown /></button>
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
        if (tasks.length > 20) return
        let newTask = {
            id: (Math.random() * 10000) + (task[0] || ''),
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
            let index = ar.findIndex((task) => task.id === id)
            ar[index].completed = !ar[index].completed
            localStorage.setItem("lofiTasks", JSON.stringify([...ar]))
            return ar
        })
    }
    const deleteTask = (id) => {
        setTasks(state => {
            let ar = [...state]
            let index = ar.findIndex((task) => task.id === id)
            ar.splice(index, 1)
            localStorage.setItem("lofiTasks", JSON.stringify([...ar]))
            return ar
        })
    }
    const deleteAllTask = () => {
        setTasks([])
        localStorage.setItem("lofiTasks", JSON.stringify([]))
    }

    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem("lofiTasks")) || [])
    }, [])

    const [visible] = useFadeIn()
    return (
        <>
            <div className="relative z-20 bg-yellow-50 p-2 rounded-lg duration-300 " style={{ opacity: `${visible ? '1' : '0'}` }}>
                <div className="flex text-[1.2rem] text-black mb-2 border-1 border-yellow-500 rounded-t-lg overflow-hidden" >
                    <input className="p-1 rounded-tl-lg outline-0" value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { addNewTask() } }} placeholder="Enter New Task" />
                    <button className="p-1 px-2 bg-yellow-800 text-yellow-100 " onClick={addNewTask}><FaPlus /></button>
                    {/* <button className="p-1 bg-yellow-800 text-yellow-100 " onClick={deleteAllTask}>Delete</button> */}
                </div>
                <ul className="overflow-y-scroll max-h-[400px]">
                    {tasks.map((task, index) => (
                        <Task task={task} key={index} toggleTask={toggleTask} deleteTask={deleteTask} />
                    ))}

                </ul>

            </div>
            <div className="max-h-[15px] text-center">
                {tasks.length > 9 &&
                    <GoTriangleDown className="mx-auto text-yellow-800 min-h-[10px] text-[1.8rem] duration-200" />
                }
            </div>
        </>
    )
}
const Task = ({ task, toggleTask, deleteTask }) => {
    return (
        <li className=" text-yellow-900 text-[1.2rem] p-1 mb-1 rounded flex items-center">
            <div className="bg-yellow-50 border-yellow-500 border-2 aspect-square min-w-[30px] mr-2 flex justify-center items-center" onClick={() => toggleTask(task.id)}>
                {task.completed && <FaCheck />}
            </div>
            <span className=" flex-grow" style={{ textDecoration: `${task.completed ? 'line-through' : 'none'}` }}>{task.title}</span>
            <button className="text-orange-500 grow-0" onClick={() => deleteTask(task.id)}><FaTrashAlt /></button>
        </li>
    )
}

const Info = () => {
    return (
        <div className="w-max text-yellow-800 bg-yellow-50 p-2 rounded-lg">
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