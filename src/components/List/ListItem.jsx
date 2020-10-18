import React from 'react'

function ListItem({ type, listItem }) {
    return (
        <li className="list-item">
                <div className="item-title-list">
                    {listItem.name}
                </div>
                <small className="list-extra-info">
                    {
                        type === "exercises" ?
                            `SETS: ${listItem.sets} / REPS: ${listItem.reps}`
                            :
                            `Last: ${listItem.last_day}`

                    }
                </small>
        </li>
    )
}

export default ListItem;
