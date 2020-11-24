import React from 'react';
import HistorySet from './HistorySet';

function HistoryLog({ date, sets }) {
    return (
        <div className="history-log">
            <div className="date">
                <h4>{date}</h4>
            </div>
            <div className="sets">
                {
                    sets.map(
                        (set, index) =>
                            <HistorySet
                                key={index}
                                set={index}
                                reps={set.reps}
                                weight={set.weight}
                            />
                    )
                }
            </div>
        </div>
    )
}

export default HistoryLog;
