import React, { useState, useEffect } from 'react';
import History from './History';
import ExerciseTable from './ExerciseTable';
import './Workout.scss';

function Workout({ workout, setWorkingWorkout }) {

    const { name, last_day, exercises } = workout;

    const [showHistory, setShowHistory] = useState(false);
    const [currWorkout, setCurrWorkout] = useState([]);
    const [exerciseNumber, setExerciseNumber] = useState(0);
    const [currentExercise, setCurrentExercise] = useState(new Array(exercises[exerciseNumber].sets).fill(0).map((item, index) => {
        return { set: (index + 1), reps: 0, weight: 0 }
    })
    );

    const handlePrevExercise = () => {
        if (exerciseNumber > 0) {
            setExerciseNumber(currExerciseNumber => currExerciseNumber - 1);
        } else {
            setExerciseNumber(exercises.length - 1);
        }
        setCurrentExercise(new Array(exercises[exerciseNumber].sets).fill(0).map((item, index) => {
            return { set: (index + 1), reps: 0, weight: 0 }
        })
        );
    }

    const handleNextExercise = () => {
        if (exerciseNumber < (exercises.length - 1)) {
            setExerciseNumber(currExerciseNumber => currExerciseNumber + 1);
        } else {
            setExerciseNumber(0);
        }
    }

    const handleAddSet = () => {
        setCurrentExercise([...currentExercise, { set: currentExercise.length + 1, reps: 0, weight: 0 }])
    }

    const handleSaveWorkout = () => {

        setCurrWorkout(prevCurrWorkout => {
            
            const exerciseName= exercises[exerciseNumber].name;
            const exerciseIndex = prevCurrWorkout.findIndex((item) => item.name === exerciseName);
            const cleanSets = currentExercise.filter(set => set.reps > 0);

            if (cleanSets.length === 0) {
                alert("don't have any working sets");
                return prevCurrWorkout;
            }

            if (exerciseIndex === -1) {
                return [...prevCurrWorkout, { name: exerciseName, sets: cleanSets }]
            } else {
                const wk = [...prevCurrWorkout];
                wk[exerciseIndex].sets = [...cleanSets];
                return wk;
            }
        })
    }

    const handleFinishWorkout = current_workout => {
        setWorkingWorkout(current_workout);
        setCurrWorkout([]);
        setCurrentExercise(new Array(exercises[exerciseNumber].sets).fill(0).map((item, index) => {
            return { set: (index + 1), reps: 0, weight: 0 }
        }));
    }

    useEffect(() => {
        const arr = new Array(exercises[exerciseNumber].sets).fill(0).map((item, index) => {
            return { set: (index + 1), reps: 0, weight: 0 }
        });
        setCurrentExercise([...arr]);
    }, [exerciseNumber])


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
                {/* <button className={showHistory ? "btn small-btn" : "btn small-btn active"} onClick={() => { setShowHistory(false) }}>sets&reps</button> */}
                <div className={showHistory ? "small-btn" : "small-btn active"} onClick={() => { setShowHistory(false) }}>sets&reps</div>
                <div className="workout-title-list exercise-title" >{exercises[exerciseNumber].sets + " SETS / " + exercises[exerciseNumber].reps + " REPS"}</div>

                {/* <button className={showHistory ? "btn small-btn active" : "btn small-btn"} onClick={() => { setShowHistory(true) }}>history</button> */}
                <div className={showHistory ? "small-btn active" : "small-btn"} onClick={() => { setShowHistory(true) }}>history</div>
            </div>

            {
                showHistory ?
                    // <History history={exercises[exerciseNumber].history} />
                    "THIS IS HISTORY"
                    :
                    <>
                        <ExerciseTable
                            currentExercise={currentExercise}
                            setCurrentExercise={setCurrentExercise}
                            exerciseNumber={exerciseNumber}
                        />
                        <button className="btn btn-workout-add-set" onClick={handleAddSet}>+ add set</button>
                        <button className="btn btn-workout-add-set" onClick={handleSaveWorkout}>Save</button>
                    </>
            }


            <div className="btn-list-view btn-low-box">
                <button className="btn">Cancel</button>
                <button className="btn" onClick={() => handleFinishWorkout(currWorkout)}>Finish Workout</button>
            </div>



        </div>
    )
}

export default Workout;
