import React from 'react';
import './History.scss';

function History() {
    return (
        <div className="history">
            <div className="history-log">
                <div className="date">
                    <h4>13/10/2020</h4>
                </div>
                <div className="sets">
                    <div className="set">
                        <div>SET 1</div>
                        <div>10 reps</div>
                        <div>50 kg</div>
                    </div>
                    <div className="set">
                        <div>SET 2</div>
                        <div>10 reps</div>
                        <div>50 kg</div>
                    </div>
                    <div className="set">
                        <div>SET 3</div>
                        <div>10 reps</div>
                        <div>50 kg</div>
                    </div>
                </div>
            </div>
            <div className="history-log">
                <div className="date">
                    <h4>13/10/2020</h4>
                </div>
                <div className="sets">
                    <div className="set">
                        <div>SET 1</div>
                        <div>10 reps</div>
                        <div>50 kg</div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default History;
