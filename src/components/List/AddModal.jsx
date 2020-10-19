import React, { useState } from 'react';

function AddModal({ type, list, setList, setModalClicked, exerciseList }) {

    const [newName, setNewName] = useState('');
    const [newSets, setNewSets] = useState(0);
    const [newReps, setNewReps] = useState(0);

    let newData;

    if (type === "workouts") {
        newData = { name: newName, last_day: "25/12/2020", exercises: [] };
    } else if (type === "exercises") {
        newData = { name: newName };
    } else if (type === "workout") {
        newData = { name: newName, sets: newSets, reps: newReps}
    } else {
        alert("Wrong type");
    }


    const handleSubmit = e => {
        e.preventDefault();
        if (newName === "") {
            alert("Chose an exercise");
        } else {
            setList([...list, newData]);
            setNewName("");
            setNewSets(0);
            setNewSets(0);
            setModalClicked(false);
        }
    }

    const handleNameInput = e => setNewName(e.target.value);
    const handleSetsInput = e => setNewSets(e.target.value);
    const handleRepsInput = e => setNewReps(e.target.value);
    const handleEnterSets = () => setNewSets("");
    const handleEnterReps = () => setNewReps("");


    return (
        <div className="modal">
            <form className="modal-form" onSubmit={handleSubmit}>
                <div className="close-modal" onClick={() => setModalClicked(false)}>
                    <i className="fas fa-times"></i>
                </div>
                {type === "workout" ||

                    <input
                        type="text"
                        placeholder={type === "workouts" ? "Workout name..." : "Exercise name..."}
                        name='name'
                        value={newName}
                        className="input-field"
                        onChange={handleNameInput}
                    />

                }


                {type !== "workout" ||
                    <>
                        <label>Choose an exercise</label>
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
                                    className="input-field number-input"
                                    onClick={handleEnterReps}
                                    onChange={handleRepsInput}
                                />
                            </div>
                        </div>
                    </>
                }
                <button className="btn">Save</button>
            </form>
        </div>
    )
}

export default AddModal;
