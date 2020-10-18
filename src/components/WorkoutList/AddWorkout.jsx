import React, { useState } from 'react';

function AddWorkout({ workout_list, setWorkouts, modalClicked, setModalClicked }) {

    const [workoutName, setWorkoutName] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        setWorkouts([...workout_list, { name: workoutName, last_day: "25/12/2020" }]);
        setWorkoutName("");
    }

    const handleInput = e => setWorkoutName(e.target.value);


    return (
        <div className="modal">
            <form className="modal-form" onSubmit={handleSubmit}>
                <div className="close-modal" onClick={() => setModalClicked(false)}>
                    <i className="fas fa-times"></i>
                </div>
                <input
                    type="text"
                    placeholder="Workout name..."
                    name='text'
                    value={workoutName}
                    className="input-field"
                    onChange={handleInput}
                />
                <button className="btn">Save</button>
            </form>
        </div>
    )
}

export default AddWorkout;
