import React, { useState, useEffect } from 'react';

function ExerciseSet({ set, currentExercise, setCurrentExercise, exerciseNumber }) {

    const [cReps, setCReps] = useState(0);
    const [cWeight, setCWeight] = useState(0);
    const [setSaved, setSetSaved] = useState(false);


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
        setSetSaved(false);
    }, [exerciseNumber])


    const handleSet = () => {
        if (cReps !== 0) {
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
    }


    const deleteSet = () => {
        setCurrentExercise(prevExercise => {
            return prevExercise.filter(cSet => {
                return cSet.set !== set

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
