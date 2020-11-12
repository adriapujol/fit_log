import React from 'react';
import History from './History';


function ExerciseView( {exercise}) {

    const { name, history } = exercise;

    return (
        <div className="content">
            <div className="header-box">
                <div className="workout-title-list workout-title">
                    {name}
                </div>
            </div>
            <History history={history} />

        </div>
    )
}

export default ExerciseView;
