import React from 'react';
import History from './History';
import './Exercise.scss';

function Exercise({ workout }) {
    return (
        <div className="content">
            <div className="header-box">
                <div className="workout-title-list workout-title">
                    {workout.name}
                </div>
                <div className="header-exercise">
                    <i className="fas fa-angle-left" />
                    <div className="workout-title-list exercise-title">
                        {workout.exercises[0].name}
                    </div>
                    <i className="fas fa-angle-right" />
                </div>
            </div>
            <div className="control-box">
                <button className="btn small-btn active">sets&reps</button>
                <button className="btn small-btn">history</button>
            </div>
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

            <button className="btn">+ add set</button>

            <div className="btn-list-view btn-low-box">
                <button className="btn">Cancel</button>
                <button className="btn">Finish Workout</button>
            </div>



        </div>
    )
}

export default Exercise;
