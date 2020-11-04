import React, { useState} from 'react';

function ExerciseSet({ set, newSets, setNewSets }) {

    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);

    const handleRepsChange = e => setReps(e.target.value);
    const handleWeightChange = e => setWeight(e.target.value);
    const handleRepClick = () => setReps("");
    const handleWeightClick = () => setWeight("");

    const findSet = (list, set) => {
        let found = false;
        let i = 0;
        while (i < list.length) {
            if(list[i].set === set) {
                found = true;
                break;
            }
            i++;
        }
        return found;
    };

    const deleteSet = () => {
        const crSet = set +1;
        setNewSets([...newSets.filter(item => item.set !== crSet)]);
    }

    const handleSet = () => {
        const crSet = set +1;
        
        if (findSet(newSets, crSet)) {
            setNewSets(currNewSets => {
                return currNewSets.map(sets => {
                    if (sets.set === crSet) {
                        return {...sets, reps: reps, weight: weight}
                    }
                    return sets;
                })
            });
        } else {
            setNewSets([...newSets, {set: crSet, reps: reps, weight: weight}]);
        }
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
                <i className="fas fa-times" onClick={deleteSet}></i>
            </td>
        </tr>
    )
}

export default ExerciseSet;
