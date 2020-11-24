import React from 'react';
import './DoneExercise.scss';
import './History.scss';
import HistorySet from './HistorySet';

function DoneExercise({ sets }) {
    return (
        <>
            <div className="history">
                <div className="history-log">
                    <div className="sets">
                        {
                            sets &&
                            sets.map((set, index) => {
                                return <HistorySet
                                    key={index}
                                    set={index}
                                    reps={set.reps}
                                    weight={set.weight}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="done-exercise">
                <h3>DONE</h3>
            </div>
        </>
    )
}

export default DoneExercise;
