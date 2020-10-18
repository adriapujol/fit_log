import React from 'react';
import './WorkoutList.scss';
import WorkoutList from './WorkoutList';

function Workouts({ workout_list}) {
    return (
        <div className="content">
            <div className="list-title">Workouts</div>
            <WorkoutList workout_list={ workout_list} />
            <button className="btn" onClick={() => alert('btn clicked')}>+ add workout</button>
        </div>
    )
}

export default Workouts;
