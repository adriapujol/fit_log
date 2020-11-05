import React, { useState, useEffect } from 'react';

function ExerciseSet({ set, reps, weight, currentExercise, setCurrentExercise, newSets, setNewSets, exerciseNumber }) {

    const [cReps, setCReps] = useState(0);
    const [cWeight, setCWeight] = useState(0);
    const [setSaved, setSetSaved] = useState(false);


    // const handleRepsChange = e => setCurrentExercise(prevCurrentExercise => {
    //         return prevCurrentExercise.map(cSet => {
    //             if (cSet === set) {
    //                 return {...cSet, reps: e.target.value}
    //             }
    //             return cSet;
    //         })
    // });


    const handleRepsChange = e => setCReps(e.target.value);
    const handleWeightChange = e => setCWeight(e.target.value);
    const handleRepClick = () => {
        setCReps("");
        setSetSaved(false);
    };
    const handleWeightClick = () => {
        setCWeight("");
        setSetSaved(false);
    };

    useEffect(() => {
        setCReps(0);
        setCWeight(0);
    }, [exerciseNumber])

    const findSet = (list, set) => {
        let found = false;
        let i = 0;
        while (i < list.length) {
            if (list[i].set === set) {
                found = true;
                break;
            }
            i++;
        }
        return found;
    };


    // const deleteSet = () => {
    //     const crSet = set +1;
    //     setNewSets([...newSets.filter(item => item.set !== crSet)]);
    // }

    // const handleSet = () => {
    //     const crSet = set +1;

    //     if (findSet(newSets, crSet)) {
    //         setNewSets(currNewSets => {
    //             return currNewSets.map(sets => {
    //                 if (sets.set === crSet) {
    //                     return {...sets, reps: reps, weight: weight}
    //                 }
    //                 return sets;
    //             })
    //         });
    //     } else {
    //         setNewSets([...newSets, {set: crSet, reps: reps, weight: weight}]);
    //     }
    // }

    const handleSet = () => {
        setCurrentExercise(prevExercise => {
            return prevExercise.map(cSet => {
                if (cSet.set === set) {
                    return { ...cSet, reps: cReps, weight: cWeight };
                }
                return cSet;
            })
        })
        setSetSaved(true);
    }


    const deleteSet = () => {
        setCurrentExercise(prevExercise => {
            return prevExercise.filter(cSet => {
                if (cSet.set !== set) {
                    return cSet;
                }
            })
        });

    };

    return (
        <tr className={setSaved ? "saved-set" : ""}>
            <td>{set}</td>
            <td>
                <input type="number" min="0" value={cWeight} onChange={handleWeightChange} onClick={handleWeightClick} /><small>kg</small>
            </td>
            <td>
                <input type="number" min="0" value={cReps} onChange={handleRepsChange} onClick={handleRepClick} />
            </td>
            <td>
                <i className="fas fa-check" onClick={handleSet}></i>
            </td>
            <td>
                {
                    set !== currentExercise.length || <i className="fas fa-times" onClick={deleteSet}></i>

                }
            </td>
        </tr>
    )
}

export default ExerciseSet;
