import React, { useState } from 'react';
import ExericseSet from './ExerciseSet';

function ExerciseTable({ currentExercise, setCurrentExercise, exerciseNumber }) {

    // const { name, sets, reps, history } = exercise;

    // console.log(sets)

    // console.log("THIS IS EXERCISE TALBE CHECK: " + history);


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
                    currentExercise.map((item, index) =>
                        <ExericseSet
                            key={index}
                            set={item.set}
                            currentExercise={currentExercise}
                            setCurrentExercise={setCurrentExercise}
                            exerciseNumber={exerciseNumber}
                        />
                    )
                }

            </tbody>
        </table>
    )
}

export default ExerciseTable;
