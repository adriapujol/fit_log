import React, { useState } from 'react';

function AddModal({ type, list, setList, setModalClicked, exerciseList }) {

    const [newName, setNewName] = useState('');
    const [newSets, setNewSets] = useState(0);
    const [newReps, setNewReps] = useState(0);

    let newData;

    if (type === "workouts") {
        newData = { name: newName, last_day: "25/12/2020", exercises: [] };
        // } else if (type === "exercises") {
        //     newData = { name: newName };
    } else if (type === "workout" || type === "exercises") {
        newData = { name: newName, sets: newSets, reps: newReps, history: [] }
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


    let modal_content;


    if (type === "workouts") {

        modal_content =
            <input
                type="text"
                placeholder={"Workout name..."}
                name='name'
                value={newName}
                className="input-field"
                onChange={handleNameInput}
            />;
    } else if (type === "exercises") {
        modal_content =
            <>
                <input
                    type="text"
                    placeholder="Exercise name..."
                    name='name'
                    value={newName}
                    className="input-field"
                    onChange={handleNameInput}
                />
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
            </>;
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
            </>;

    }


    return (
        <div className="modal">
            <form className="modal-form" onSubmit={handleSubmit}>
                <div className="close-modal" onClick={() => setModalClicked(false)}>
                    <i className="fas fa-times"></i>
                </div>
                {modal_content}
                <button className="btn">Save</button>
            </form>
        </div>
    )
}

export default AddModal;
