import React, { useState } from 'react';

function AddModal({ type, list, setList, setModalClicked, exerciseList, saveDB }) {

    const [newName, setNewName] = useState('');
    const [newSets, setNewSets] = useState(0);
    const [newReps, setNewReps] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const handleNameInput = e => setNewName(e.target.value);
    const handleSetsInput = e => setNewSets(e.target.value);
    const handleRepsInput = e => setNewReps(e.target.value);
    const handleEnterSets = () => setNewSets("");
    const handleEnterReps = () => setNewReps("");

    let newData;

    if (type === "workouts") {
        newData = { name: newName, last_day: "", exercises: [] };
    } else if (type === "workout") {
        newData = { name: newName, sets: newSets, reps: newReps }
    } else if (type === "exercises") {
        newData = { name: newName, history: [] }
    } else {
        alert("Wrong type");
    }

    const handleSubmit = e => {
        e.preventDefault();
        setShowMessage(false);
        if (newName === "") {
            setShowMessage(true);
            setAlertMessage("Chose a name");
            return;
        }
        if (type === "workout") {
            setList(prevWorkout => {
                return prevWorkout.map(workout => {
                    if (workout.name === list.name) {
                        let newExercises = workout.exercises.filter(exercise => exercise.name !== newData.name);
                        return { ...workout, exercises: [...newExercises, newData] }
                    }
                    return workout;
                })
            });
            setNewName("");
            setNewSets(0);
            setNewSets(0);
            setModalClicked(false);
        } else {
            let itemFound = list.find(item => item.name === newData.name)
            if (itemFound !== undefined) {
                setShowMessage(true);
                setAlertMessage("This name is already taken");
                return
            } else {
                setList([...list, newData]);
            }
            setNewName("");
            setModalClicked(false);
        }
    }


    let modal_content;

    if (type !== "workout") {

        modal_content =
            <input
                type="text"
                placeholder={type === "workouts" ? "Workout name..." : "Exercise name..."}
                name='name'
                value={newName}
                className="input-field"
                onChange={handleNameInput}
            />;
    } else if (type === "workout") {
        modal_content =
            <>
                <select name='exercises' id="exercises" className="input-field select-input" onChange={handleNameInput}>
                    <option value="" hidden>Select an exercise...</option>
                    {
                        exerciseList.map((exercise, index) => {
                            return (
                                <option key={index} value={exercise.name}>{exercise.name}</option>
                            )
                        }
                        )
                    }
                </select>
                <div className="sets-reps-inputs">
                    <div className="number-input-box">
                        <label>SETS</label>
                        <input
                            type="number"
                            name='sets'
                            value={newSets}
                            min="0"
                            max="99"
                            className="input-field number-input"
                            onClick={handleEnterSets}
                            onChange={handleSetsInput}
                        />
                    </div>
                    <div className="number-input-box">
                        <label>REPS</label>
                        <input
                            type="number"
                            name='reps'
                            value={newReps}
                            min="0"
                            max="99"
                            className="input-field number-input"
                            onClick={handleEnterReps}
                            onChange={handleRepsInput}
                        />
                    </div>
                </div>
            </>;

    }

    return (
        <div className="modal">
            <form className="modal-form" onSubmit={handleSubmit}>
                <div className="close-modal" onClick={() => setModalClicked(false)}>
                    <i className="fas fa-times"></i>
                </div>
                {modal_content}
                <div className={showMessage ? "alert-message" : "alert-message hide-alert"}>{alertMessage}</div>
                <button className="btn">Save</button>
            </form>
        </div>
    )
}

export default AddModal;
