import React from 'react';

function ExerciseSet({ set }) {
    return (
        <tr>
            <td>{set+1}</td>
            <td>
                <input type="number" min="0" /><small>kg</small>
            </td>
            <td>
                <input type="number" min="0" />
            </td>
            <td>
                <i class="fas fa-check"></i>
            </td>
            <td>
                <i className="fas fa-times"></i>
            </td>
        </tr>
    )
}

export default ExerciseSet;
