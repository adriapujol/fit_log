import React from 'react';
import HistoryLog from './HistoryLog';
import './History.scss';

function History({ history }) {
    return (
        <div className="history">
            {history.map((log, index) => <HistoryLog key={index} date={log.date} sets={log.sets} />) }
        </div>
    )
}

export default History;
