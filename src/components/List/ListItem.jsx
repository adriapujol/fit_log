import React, { useState } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import ConfirmModal from '../ConfirmModal';

function ListItem({ type, listItem, workoutName, handleDeleteListItem, setCurrWorkoutName, setCurrExerciseName }) {

    const [confirm, setConfirm] = useState(false);
    const { itemName, itemType } = useParams();
    const location = useLocation();
    console.log(itemName, location.pathname);

    const onConfirm = () => {
        handleDeleteListItem(type, listItem.name, workoutName);
        setConfirm(false);
    }

    const onCancel = () => {
        setConfirm(false);
    }

    const onClose = () => {
        setConfirm(false);
    }

    const selectWorkout = () => {
        if (type === "workouts") {
            setCurrWorkoutName(listItem.name);
        } else {
            setCurrExerciseName(listItem.name);
        }
    }

    const deleteExerciseFromWorkoutMsg = `The <strong>${listItem.name}<strong> exercise will be deleted from the ${workoutName} workout.`;
    const deleteWorkoutMsg = `The ${listItem.name} workout will be deleted. ${workoutName}`;
    const deleteExerciseMsg = `The ${listItem.name} exercise will be removed from all the workouts and it will lose its history.`;
    const confirmMessage = type === "workout" ? deleteExerciseFromWorkoutMsg : (type === "workouts" ? deleteWorkoutMsg : deleteExerciseMsg)


    return (
        <>
            {confirm && <ConfirmModal message={confirmMessage} onClose={onClose} onConfirm={onConfirm} onCancel={onCancel} />}
            <li className="list-item">
                <div className="item-title-list">
                    {
                        type !== "workout" ?
                            <Link to={`/${type}/${listItem.name.replace(/ /g, "-").toLowerCase()}`} onClick={selectWorkout}>
                                {listItem.name}
                            </Link> :
                            <Link to={`/exercises/${listItem.name.replace(/ /g, "-").toLowerCase()}`} onClick={selectWorkout}>
                                {listItem.name}
                            </Link>
                    }
                </div>
                <div className="sets-delete-wrapper">
                    <small className="list-extra-info">
                        {
                            type === "workout" ?
                                `SETS: ${listItem.sets} / REPS: ${listItem.reps}`
                                :
                                type === "workouts" ?
                                    `Last: ${listItem.last_day}`
                                    :
                                    null
                        }
                    </small>
                    <div className="delete-item" onClick={() => setConfirm(true)} >
                        <i className="fas fa-times"></i>
                    </div>
                </div>
            </li>
        </>
    )
}

export default ListItem;
