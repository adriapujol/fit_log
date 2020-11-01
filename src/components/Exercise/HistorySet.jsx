import React from 'react';

function HistorySet({ set, reps, weight }) {
    return (
        <div className="set">
            <div>SET {set+1}</div>
            <div>{reps} reps</div>
            <div>{weight} kg</div>
        </div>
    )
}

export default HistorySet;