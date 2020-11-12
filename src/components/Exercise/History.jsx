import React from 'react';
import HistoryLog from './HistoryLog';
import './History.scss';

function History({ history }) {
    return (
        <div className="history">
            {history.length > 0 || <div className="no-history">No history yet for this exercise</div>}
            {history.map((log, index) => <HistoryLog key={index} date={log.date} sets={log.sets} />) }
        </div>
    )
}

export default History;
