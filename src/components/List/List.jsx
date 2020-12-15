import React from 'react';
import ListItem from './ListItem.jsx';

function List({ type, list, setList, setSecondList, setCurrWorkoutName, setCurrExerciseName }) {

    const workingList = type === "workout" ? list.exercises : list;

    const handleDeleteList = (t, n, ln = "") => {
        if (t === "workouts") {
            setList(prevList => {
                return prevList.filter(item => item.name !== n);
            });
        } else if (t === "workout") {
            setList(prevList => {               
                return prevList.map(workout => {
                    if(workout.name === ln) {
                        return {...workout, exercises: [...workout.exercises.filter(item => item.name !== n)]};
                    }
                    return workout;
                });
            })
        } else if (t === "exercises") {
            setList(prevList => {
                return prevList.filter(item => item.name !== n);
            });
            setSecondList(prevSecondList => {
                return prevSecondList.map(workout => {
                    const newExercises = workout.exercises.filter(exercise => exercise.name !== n);
                    return {...workout, exercises: [...newExercises]}
                })
            })
        }
        
    }

    return (
        <ul className="list">
            {
                workingList.map((item, index) => <ListItem 
                                                    key={index} 
                                                    type={type} 
                                                    listItem={item} 
                                                    workoutName={list.name}
                                                    handleDeleteListItem={handleDeleteList}
                                                    setCurrWorkoutName={setCurrWorkoutName}
                                                    setCurrExerciseName={setCurrExerciseName}
                                                     />)
            }
        </ul>
    )
}

export default List;
