import React from 'react';

function HistorySet({ set, reps, weight }) {
    return (
        <div className="set">
            <div className="set-number">SET {set + 1}</div>
            <div className="reps-number">{reps} reps</div>
            <div className="weight-number">{weight} kg</div>
        </div>
    )
}

export default HistorySet;