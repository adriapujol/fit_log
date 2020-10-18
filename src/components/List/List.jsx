import React from 'react';
import ListItem from './ListItem.jsx';

function List({ type, list }) {

    return (
        <ul className="list">
            {
                list.map((item, index) => <ListItem key={index} type={type} listItem={item} />)
            }
        </ul>
    )
}

export default List;
