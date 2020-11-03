import React, { useState, useEffect } from 'react';
import History from './History';
import ExerciseTable from './ExerciseTable';
import './Exercise.scss';

function Exercise({ workout }) {

    const { name, last_day, exercises } = workout;

    const [showHistory, setShowHistory] = useState(false);
    const [exerciseNumber, setExerciseNumber] = useState(0);

    const handlePrevExercise = () => {
        if (exerciseNumber > 0) {
            setExerciseNumber(currExerciseNumber => currExerciseNumber -1 )
        } else {
            setExerciseNumber(exercises.length-1)
        }
    }

    const handleNextExercise = () => {
        if (exerciseNumber < (exercises.length-1)) {
            setExerciseNumber(currExerciseNumber => currExerciseNumber +1 )
        } else {
            setExerciseNumber(0)
        }
 
    }
    // console.log(exercises.length);

    // useEffect(() => {
    //     console.log("useEffect: " + exerciseNumber)
    // }, [exerciseNumber])

    return (
        <div className="content">
            <div className="header-box">
                <div className="workout-title-list workout-title">
                    {name}
                </div>
                <div className="header-exercise">
                    <i className="fas fa-angle-left" onClick={handlePrevExercise} />
                    <div className="workout-title-list exercise-title">
                        {exercises[exerciseNumber].name}
                    </div>
                    <i className="fas fa-angle-right" onClick={handleNextExercise} />
                </div>
            </div>
            <div className="control-box">
                <button className={showHistory ? "btn small-btn" : "btn small-btn active"} onClick={() => { setShowHistory(false) }}>sets&reps</button>
                <button className={showHistory ? "btn small-btn active" : "btn small-btn"} onClick={() => { setShowHistory(true) }}>history</button>
            </div>

            {
                showHistory ?
                    <History history={exercises[exerciseNumber].history} />
                    :
                    <>
                        <ExerciseTable exercise={exercises[exerciseNumber]} />
                        <button className="btn btn-workout-add-set">+ add set</button>
                    </>
            }


            <div className="btn-list-view btn-low-box">
                <button className="btn">Cancel</button>
                <button className="btn">Finish Workout</button>
            </div>



        </div>
    )
}

export default Exercise;
