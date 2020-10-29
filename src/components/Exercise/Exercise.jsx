import React from 'react';
import History from './History';
import ExerciseTable from './ExerciseTable';
import './Exercise.scss';

function Exercise({ workout }) {
    return (
        <div className="content">
            <div className="header-box">
                <div className="workout-title-list workout-title">
                    {workout.name}
                </div>
                <div className="header-exercise">
                    <i className="fas fa-angle-left" />
                    <div className="workout-title-list exercise-title">
                        {workout.exercises[0].name}
                    </div>
                    <i className="fas fa-angle-right" />
                </div>
            </div>
            <div className="control-box">
                <button className="btn small-btn active">sets&reps</button>
                <button className="btn small-btn">history</button>
            </div>

            
            {/* <ExerciseTable />

            <button className="btn">+ add set</button> */}

            <History />

            <div className="btn-list-view btn-low-box">
                <button className="btn">Cancel</button>
                <button className="btn">Finish Workout</button>
            </div>



        </div>
    )
}

export default Exercise;
