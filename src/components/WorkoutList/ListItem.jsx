import React from 'react'

function ListItem({ listItem }) {
    return (
        <li className="list-item">
                <div className="workout-title-list">
                    {listItem.name}
                </div>
                <small className="last-date">
                    {listItem.last_day.length <= 0 || `Last: ${listItem.last_day}`}
                </small>
        </li>
    )
}

export default ListItem;
