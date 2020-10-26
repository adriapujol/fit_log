import React from 'react'

function ListItem({ type, listItem, list, setList, workoutsList }) {

    const handleDeleteList = () => {
        setList(list.filter(item => item.name !== listItem.name));
    }

    const handleDeleteWorkoutExercise = () => {
        // const workouts = workoutsList;
        const newExerciseList = list.exercises.filter(item => item.name !== listItem.name);
        const workoutPosition = workoutsList.findIndex(w => w.name === list.name);
        workoutsList[workoutPosition].exercises = [...newExerciseList];
        setList(workoutsList);

    }

    return (
        <li className="list-item">
            <div className="item-title-list">
                {listItem.name}
            </div>
            <div className="sets-delete-wrapper">
                <small className="list-extra-info">
                    {
                        type === "workout" ?
                            `SETS: ${listItem.sets} / REPS: ${listItem.reps}`
                            :
                            type === "wrokouts" ?
                                `Last: ${listItem.last_day}`
                                :
                                ""

                    }
                </small>
                <div className="delete-item" onClick={type === "workout" ? handleDeleteWorkoutExercise : handleDeleteList}>
                    <i className="fas fa-times"></i>
                </div>
            </div>
        </li>
    )
}

export default ListItem;
