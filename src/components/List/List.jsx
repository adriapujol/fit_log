import React from 'react';
import ListItem from './ListItem.jsx';

function List({ type, currWorkout, list, setList, workoutsList }) {

    const workingList = type !== "workout" ? list : list[currWorkout].exercises;

    const handleDeleteList = (t, l, n) => {
        if (t !== "workout") {
            setList(l.filter(item => item.name !== n));
        } else if (t === "workout") {

            // const workoutPosition = wl.findIndex(w => w.name === wn);
            // wl[workoutPosition].exercises = l.filter(item => item.name !== n)
            // setList([...wl]);
        }
        console.log(l);
    }

    // const handleDeleteWorkoutExercise = () => {
    //     // const workouts = workoutsList;
    //     const newExerciseList = list.exercises.filter(item => item.name !== listItem.name);
    //     const workoutPosition = workoutsList.findIndex(w => w.name === list.name);
    //     workoutsList[workoutPosition].exercises = [...newExerciseList];
    //     setList(workoutsList);

    // }

    return (
        <ul className="list">
            {
                workingList.map((item, index) => <ListItem 
                                                    key={index} 
                                                    type={type} 
                                                    listItem={item} 
                                                    list={list}
                                                    currWorkout={currWorkout} 
                                                    setList={setList} 
                                                    workoutsList={workoutsList}
                                                    handleDeleteListItem={handleDeleteList} />)
            }
        </ul>
    )
}

export default List;
