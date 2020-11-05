import React, { useState } from 'react';
import ExericseSet from './ExerciseSet';

function ExerciseTable({ exercise, newSets, setNewSets, currentExercise, setCurrentExercise, exerciseNumber }) {

    const { name, sets, reps, history } = exercise;
    // const [currentExercise, setCurrentExercise] = useState(new Array(sets).fill(0).map((item, index) => {
    //     return { set: (index + 1), reps: 0, weight: 0 }
    //     })
    // );
    
    console.log(sets)

    console.log("THIS IS EXERCISE TALBE CHECK: " + history);


    // const exerciseSets = setNumber.map((item, index) => {
    //     return {set: (index+1), reps: 0, weight: 0}
    // });

    // setCurrentExercise([...exerciseSets]);

    // console.log(exerciseSets);

    return (
        <table className="sets-table">
            <tbody>
                <tr>
                    <th>SET</th>
                    <th>Weight</th>
                    <th>Reps</th>
                    <th></th>
                    <th></th>
                </tr>
                {
                    currentExercise.map((item, index) => <ExericseSet key={index} set={item.set} reps={item.reps} weight={item.weight} currentExercise={currentExercise} setCurrentExercise={setCurrentExercise}  newSets={newSets} setNewSets={setNewSets} exerciseNumber={exerciseNumber}/>)
                }

            </tbody>
        </table>
    )
}

export default ExerciseTable;
