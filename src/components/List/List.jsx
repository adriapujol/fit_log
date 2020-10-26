import React from 'react';
import ListItem from './ListItem.jsx';

function List({ type, list, setList, workoutsList }) {

    const workingList = type !== "workout" ? list : list.exercises;

    return (
        <ul className="list">
            {
                workingList.map((item, index) => <ListItem key={index} type={type} listItem={item} list={list} setList={setList} workoutsList={workoutsList} />)
            }
        </ul>
    )
}

export default List;
