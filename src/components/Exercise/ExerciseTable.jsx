import React from 'react';
import ExericseSet from './ExerciseSet';

function ExerciseTable({ exercise }) {

    const { name, sets, reps, history } = exercise;

    const setNumber = new Array(sets).fill(0);

    console.log("this is the set number: " + setNumber);

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
                    setNumber.map((item, index) => <ExericseSet key={index} set={index} /> )
                }
                
            </tbody>
        </table>
    )
}

export default ExerciseTable;
