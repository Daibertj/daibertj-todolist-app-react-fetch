import React, { useState, useEffect } from "react";

const URLBASE = "https://assets.breatheco.de/apis/fake/todos/user/daibert"


//create your first component
const Todos = () => {
	const [valueEntry, setValueEntry] = useState("")
	const [tasks, setTasks] = useState([])
	

	const getTask = async () => {
		try {
			let response = await fetch(`${URLBASE}`)
			let data = await response.json()

			if(response.status == 404){
				console.log("Te invitamos a crear tu usuario")
				createUser()
			}else{
				setTasks(data)
			}

		} catch (error) {
			console.log(error)
		}
	}

	const createUser = async() => {
		try {
			let response = await fetch(`${URLBASE}`, {
				method: "POST",
				header: {"Content-type": "application/json"},
				body: JSON.stringify([])
			})
			if(response.ok){
				getTask()
			}else{
				console.log(response)
			}

		} catch (error) {
			console.log(error)
		}
	}

	const addTask = async() => {
		try {
			let response = await fetch(`${URLBASE}`, {
				method: "PUT",
				header: {"Content-type": "application/json"},
				body: JSON.stringify([...tasks, {label: valueEntry, done : false}])
			})
			if(response.ok){
				getTask()
			}else{
				console.log(response)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const deleteAllTaks = async() =>{
		try {
			let response = await fetch(`${URLBASE}`, {
				method: "DELETE",
				heater: {"Content-type": "application/json"}				
			})
		} catch (error) {
			console.log(error)
		}
	}
	

	useEffect(()=> {
		getTask()
	}, [])

	return (
		<>

			<div className="container">

				<h1> to-dos </h1>

				<ul>
					<li>
						<input type="text"
							onChange={(e) => setValueEntry(e.target.value)}
							value={valueEntry}
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									addTask();
									setValueEntry("")
								}
							}}
							placeholder="What needs to be done?"></input>

					</li>

					{tasks.map((item, index) => (
						<li key={index}>
							<span className="d-flex justify-content-between">
								{item.label} <i className="fas fa-times"
									onClick={() =>
										setTasks(
											tasks.filter(
												(t, currentIndex) =>
													index != currentIndex
											)
										)
									}></i>
							</span>
						</li>
					))}
				</ul>
				<div>{tasks.length} items left</div>

			</div >

		</>
	);
};

export default Todos;
