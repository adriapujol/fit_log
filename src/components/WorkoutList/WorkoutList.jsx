import React from 'react';
import ListItem from './ListItem.jsx';

function WorkoutList({ workout_list }) {

    return (
        <ul className="list">
            {
                workout_list.map((item, index) => <ListItem key={index} listItem={item} />)
            }
        </ul>
    )
}

export default WorkoutList;
