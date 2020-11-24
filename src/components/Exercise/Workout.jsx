import React, { useState, useEffect } from 'react';
import History from './History';
import ExerciseTable from './ExerciseTable';
import ConfirmModal from '../ConfirmModal';
import { Link } from "react-router-dom";
import './Workout.scss';
import DoneExercise from './DoneExercise';

function Workout({ workout, setWorkingWorkout, exerciseList }) {

    const { name, exercises } = workout;

    const [showHistory, setShowHistory] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalSaved, setShowModalSaved] = useState(false);
    const [direction, setDirection] = useState("prev");
    const [saved, setSaved] = useState(false);
    const [savedCurrDoneSets, setSavedCurrDoneSets] = useState({});
    const [emptySets, setEmptySets] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [currWorkout, setCurrWorkout] = useState([]);
    const [exerciseNumber, setExerciseNumber] = useState(0);
    const [currentExercise, setCurrentExercise] = useState(new Array(exercises[exerciseNumber].sets).fill(0).map((item, index) => {
        return { set: (index + 1), reps: 0, weight: 0 }
    })
    );

    const filterByName = (arr, arrFilter) => {
        return arr.filter(item => {
            let found = false;
            for (let it of arrFilter) {
                if (it.name === item.name) found = true;
            }
            return found;
        })
    }
    const filtered_exerciseList = filterByName(exerciseList, exercises);
    const history = filtered_exerciseList.find(exercise => exercise.name === exercises[exerciseNumber].name).history;


    const findItem = (arr, item) => {
        let found = false;
        let currentlyDone = {};

        for (let it of arr) {
            if (it.name === item.name) {
                found = true;
                currentlyDone = {...it};
                break;
            }
        }
        console.log(currentlyDone);
        return {found, currentlyDone};
    }

    const isItDone = () => {
        const alreadyDone = findItem(currWorkout, exercises[exerciseNumber]);
        setIsDone(alreadyDone.found);
        setSaved(alreadyDone.found);
        setSavedCurrDoneSets(alreadyDone.currentlyDone);
    }

    const prevExercise = () => {
        console.log("prev fired");
        if (exerciseNumber > 0) {
            setExerciseNumber(currExerciseNumber => currExerciseNumber - 1);
        } else {
            setExerciseNumber(exercises.length - 1);
        }
    }

    const nextExercise = () => {
        console.log("next fired");
        if (exerciseNumber < (exercises.length - 1)) {
            setExerciseNumber(currExerciseNumber => currExerciseNumber + 1);
        } else {
            setExerciseNumber(0);
        }
    }

    const handlePrevExercise = () => {
        setDirection("prev");
        const cleanSets = currentExercise.filter(set => set.reps > 0);
        if (!saved && cleanSets.length !== 0) {
            setShowModal(true);
        } else {
            prevExercise();
        }
    }

    const handleNextExercise = () => {
        setDirection("next");
        const cleanSets = currentExercise.filter(set => set.reps > 0);
        if (!saved && cleanSets.length !== 0) {
            setShowModal(true);
        } else {
            nextExercise();
        }
    }

    const handleNotSavedDirections = () => {
        if (direction === "next") {
            nextExercise();
            console.log("modal next method fired");
            setShowModal(false);
        } else if (direction === "prev") {
            prevExercise();
            console.log("modal prev method fired");
            setShowModal(false);
        }
    }

    const changeExerciseMessage = "The data not saved will be lost.";
    const savedExerciseMessage = "You won't be able to edit afterwards.";

    const handleAddSet = () => {
        setCurrentExercise([...currentExercise, { set: currentExercise.length + 1, reps: 0, weight: 0 }])
    }

    const handleSaveWorkout = () => {

        setCurrWorkout(prevCurrWorkout => {

            const exerciseName = exercises[exerciseNumber].name;
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
        setSaved(true);
        setShowModalSaved(false);
    }

    const handleSavedModal = () => {
        const cleanSets = currentExercise.filter(set => set.reps > 0);
        if (cleanSets.length === 0) {
            setEmptySets(true);
        } else {
            setEmptySets(false);
            setShowModalSaved(true);
        }

    }

    useEffect(() => {
        isItDone();
    }, [currWorkout])

    const handleFinishWorkout = current_workout => {
        setWorkingWorkout(name, current_workout);
        setCurrWorkout([]);
        setCurrentExercise(new Array(exercises[exerciseNumber].sets).fill(0).map((item, index) => {
            return { set: (index + 1), reps: 0, weight: 0 }
        }));
    }

    useEffect(() => {
        isItDone();
        const arr = new Array(exercises[exerciseNumber].sets).fill(0).map((item, index) => {
            return { set: (index + 1), reps: 0, weight: 0 }
        });
        setCurrentExercise([...arr]);
        setEmptySets(false);
        // setSaved(false);
    }, [exerciseNumber, exercises])


    return (
        <div className="content">
            {showModalSaved && <ConfirmModal message={savedExerciseMessage} onConfirm={handleSaveWorkout} onCancel={() => setShowModalSaved(false)} />}
            {showModal && <ConfirmModal message={changeExerciseMessage} onConfirm={handleNotSavedDirections} onCancel={() => setShowModal(false)} />}
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
                <div className={showHistory ? "small-btn" : "small-btn active"} onClick={() => { setShowHistory(false) }}>sets&reps</div>
                <div className="workout-title-list exercise-title" >{exercises[exerciseNumber].sets + " SETS / " + exercises[exerciseNumber].reps + " REPS"}</div>
                <div className={showHistory ? "small-btn active" : "small-btn"} onClick={() => { setShowHistory(true) }}>history</div>
            </div>





            {   isDone ?
                <DoneExercise sets={savedCurrDoneSets.sets} />
                :

                (showHistory ?
                    <History history={history} />
                    :
                    <>
                        <ExerciseTable
                            currentExercise={currentExercise}
                            setCurrentExercise={setCurrentExercise}
                            exerciseNumber={exerciseNumber}
                        />
                        <div className="empty-sets-alert">{emptySets && "Don't have any working sets"}</div>
                        <button className="btn btn-workout-add-set" onClick={handleAddSet}>+ add set</button>
                        <button className="btn btn-workout-add-set" onClick={handleSavedModal}>Save</button>
                    </>)
            }


            <div className="btn-list-view btn-low-box">
                <button className="btn">Cancel</button>
                <Link to={"/workouts"} className="btn" onClick={() => handleFinishWorkout(currWorkout)}>Finish Workout</Link>
            </div>



        </div>
    )
}

export default Workout;
