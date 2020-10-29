import React from 'react';

function ExerciseTable() {
    return (
        <table className="sets-table">
            <tbody>
                <tr>
                    <th>SET</th>
                    <th>Weight</th>
                    <th>Reps</th>
                    <th></th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>
                        <input type="number" min="0" /><small>kg</small>
                    </td>
                    <td>
                        <input type="number" min="0" />
                    </td>
                    <td>
                        <i className="fas fa-times"></i>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>
                        <input type="number" min="0" /><small>kg</small>
                    </td>
                    <td>
                        <input type="number" min="0" />
                    </td>
                    <td>
                        <i className="fas fa-times"></i>
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>
                        <input type="number" min="0" /><small>kg</small>
                    </td>
                    <td>
                        <input type="number" min="0" />
                    </td>
                    <td>
                        <i className="fas fa-times"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default ExerciseTable;
