import React from 'react'

function ListItem({ type, listItem }) {
    return (
        <li className="list-item">
            <div className="item-title-list">
                {listItem.name}
            </div>
            <div className="sets-delete-wrapper">
                <small className="list-extra-info">
                    {
                        type === "workout" ?
                            `SETS: ${listItem.sets} / REPS: ${listItem.reps}`
                            :
                            type === "wrokouts" ?
                                `Last: ${listItem.last_day}`
                                :
                                ""

                    }
                </small>
                <div className="delete-item" onClick={() => alert("Deleted!")}>
                    <i className="fas fa-times"></i>
                </div>
            </div>
        </li>
    )
}

export default ListItem;
