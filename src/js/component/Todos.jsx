import React, { useState, useEffect } from "react";

const URLBASE = "https://assets.breatheco.de/apis/fake/todos/user/daibert"


//create your first component
const Todos = () => {
    const [valueEntry, setValueEntry] = useState({ label: "", done: false })
    const [tasks, setTasks] = useState([])


    const getTask = async () => {
        try {
            let response = await fetch(`${URLBASE}`)
            let data = await response.json()

            if (response.status == 404) {
                console.log("Te invitamos a crear tu usuario")
                createUser()
            } else {
                setTasks(data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const createUser = async () => {
        try {
            let response = await fetch(`${URLBASE}`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify([])
            })
            if (response.ok) {
                getTask()
            } else {
                console.log(response)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const addTask = async (event) => {
        console.log(event.key)

        if (event.key == "Enter") {
            try {
                let response = await fetch(`${URLBASE}`, {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify([...tasks, valueEntry])
                })
                if (response.ok) {
                    getTask()
                    setValueEntry({ label: "", done: false })
                } else {
                    console.log(response)
                }
            } catch (error) {
                console.log(error)
            }
        }

    }

    const deleteAllTaks = async () => {
        try {
            let response = await fetch(`${URLBASE}`, {
                method: "DELETE",
                headers: { "Content-type": "application/json" }
            })
			if (response.ok) {
				getTask()
				
			} else {
				console.log(response)
			}
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = ({ target }) => {
        setValueEntry({
            ...valueEntry,
            [target.name]: target.value
        })
    }


    const deleteTask = async(id) => {
        console.log(id)
        try {
            let response = await fetch(`${URLBASE}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(tasks.filter((_, index) => index != id))
            })
            if (response.ok) {
                getTask()
                setValueEntry({ label: "", done: false })
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTask()
    }, [])

    return (
        <>

            <div className="container">

                <h1> to-dos </h1>

                <ul>
                    <li>
                        <input type="text"
                            placeholder="What needs to be done?"
                            name="label"
                            value={valueEntry.label}
                            onChange={handleChange}
                            onKeyDown={addTask}
                        />
                    </li>

                    {tasks.map((item, index) => (
                        <li key={index}>
                            <span className="d-flex justify-content-between">
                                {item.label}
                                <i className="fas fa-times"
                                    onClick={() => deleteTask(index)}
                                ></i>
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="d-flex justify-content-between">
					{tasks.length} items left
					<button 
						onClick={() => deleteAllTaks()}
						type="button" 
						className="btn btn-danger">Delete All</button>
				</div>
				
            </div >

        </>
    );
};

export default Todos;