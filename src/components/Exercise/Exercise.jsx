import React from 'react';
import History from './History';
import './Exercise.scss';

function Exercise() {
    return (
        <div className="content">
            <div className="header-exercise">
                <i className="fas fa-angle-left" />
                <div className="workout-title-list exercise-title">
                    Flat bench press
                </div>
                <i className="fas fa-angle-right" />
            </div>
            <div className="control-box">
                <button className="btn small-btn">sets&reps</button>
                <button className="btn small-btn">history</button>
            </div>
            <table className="sets-table">
                <tr>
                    <th>SET</th>
                    <th>Weight</th>
                    <th>Reps</th>
                </tr>
                <tr>
                    <td>1</td>
                    <div>
                        <input type="number" min="0" /><small>kg</small>
                    </div>
                    <input type="number" min="0" />
                </tr>
                <tr>
                    <td>2</td>
                    <div>
                        <input type="number" min="0" /><small>kg</small>
                    </div>
                    <input type="number" min="0" />
                </tr>
                <tr>
                    <td>3</td>
                    <div>
                        <input type="number" min="0" /><small>kg</small>
                    </div>
                    <input type="number" min="0" />
                </tr>
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
