import React, { useState} from 'react';

const findExercise = (name, list) => {
    let i = 0;

    while(i < list.length) {
        if (list[i].name === name ) break;
        i++;
    }
    return i;
}


function ExerciseSet({ set, newSets, setNewSets }) {

    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);

    const handleRepsChange = e => setReps(e.target.value);
    const handleWeightChange = e => setWeight(e.target.value);
    const handleRepClick = () => setReps("");
    const handleWeightClick = () => setWeight("");

    const handleSet = () => {

        setNewSets([...newSets, {reps: reps, weight: weight}]);
        // const exerciseIndex = findExercise(exerciseName, newHistory);
        // console.log(exerciseIndex);
        // newHistory[exerciseIndex].history.sets.push({reps: reps, weight: weight});
        // setExerciseHistory(newHistory);
        // newHistory.unshift({date: "03/11/2020", sets: []});
        // newHistory[0].sets.push({reps: reps, weight: weight});
        console.log(newSets);
        // newHistory[set].weight = weight;

        // setExerciseHistory(newHistory);

    }


    return (
        <tr>
            <td>{set+1}</td>
            <td>
                <input type="number" min="0" value={reps} onChange={handleRepsChange} onClick={handleRepClick} /><small>kg</small>
            </td>
            <td>
                <input type="number" min="0" value={weight} onChange={handleWeightChange} onClick={handleWeightClick} />
            </td>
            <td>
                <i className="fas fa-check" onClick={handleSet}></i>
            </td>
            <td>
                <i className="fas fa-times"></i>
            </td>
        </tr>
    )
}

export default ExerciseSet;
