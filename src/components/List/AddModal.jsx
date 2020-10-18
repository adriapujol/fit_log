import React, { useState } from 'react';

function AddModal({ type, list, setList, setModalClicked }) {

    const [newName, setNewName] = useState('');
    const [newSets, setNewSets] = useState();
    const [newReps, setNewReps] = useState();

    let newData;

    if (type === "workouts") {
        newData = { name: newName, last_day: "25/12/2020" };
    } else if (type === "exercises") {
        newData = { name: newName, sets: newSets, reps: newReps };
    }


    const handleSubmit = e => {
        e.preventDefault();
        setList([...list, newData]);
        setNewName("");
        setNewSets();
        setNewSets();
        setModalClicked(false);
    }

    const handleNameInput = e => setNewName(e.target.value);
    const handleSetsInput = e => setNewSets(e.target.value);
    const handleRepsInput = e => setNewReps(e.target.value);


    return (
        <div className="modal">
            <form className="modal-form" onSubmit={handleSubmit}>
                <div className="close-modal" onClick={() => setModalClicked(false)}>
                    <i className="fas fa-times"></i>
                </div>
                <input
                    type="text"
                    placeholder={type==="workouts" ? "Workout name..." : "Exercise name..."}
                    name='name'
                    value={newName}
                    className="input-field"
                    onChange={handleNameInput}
                />

                {type !== "exercises" ||
                    <div className="sets-reps-inputs">
                        <div className="number-input-box">
                            <label>SETS</label>
                            <input
                                type="number"
                                name='sets'
                                value={newSets}
                                min="0"
                                className="input-field number-input"
                                onChange={handleSetsInput}
                            />
                        </div>
                        <div className="number-input-box">
                            <label>REPS</label>
                            <input
                                type="number"
                                name='reps'
                                min="0"
                                value={newReps}
                                className="input-field"
                                onChange={handleRepsInput}
                            />
                        </div>
                    </div>
                }
                <button className="btn">Save</button>
            </form>
        </div>
    )
}

export default AddModal;
