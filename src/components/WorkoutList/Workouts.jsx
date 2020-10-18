import React, { useState } from 'react';
import './WorkoutList.scss';
import WorkoutList from './WorkoutList';
import AddWorkout from './AddWorkout';

function Workouts({ workout_list, setWorkouts }) {

    const [modalClicked, setModalClicked] = useState(false);

    return (
        <div className="content">
            <div className="list-title">Workouts</div>
            <WorkoutList workout_list={workout_list} />
            {!modalClicked || <AddWorkout workout_list={workout_list} setWorkouts={setWorkouts} setModalClicked={setModalClicked} />}
            <button className="btn btn-list-view" onClick={() => setModalClicked(true)}>+ add workout</button>
        </div>
    )
}

export default Workouts;
