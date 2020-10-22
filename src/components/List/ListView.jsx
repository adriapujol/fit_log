import React, { useState } from 'react';
import './List.scss';
import List from './List';
import AddModal from './AddModal';

function ListView({ type, list, setList, exerciseList }) {

    const [modalClicked, setModalClicked] = useState(false);

    const workingList = type !== "workout" ? list : list.exercises;


    return (
        <div className="content">
            <div className="list-title">{type==="workout" ? list.name : type}</div>
            <List type={type} list={workingList} />
            {!modalClicked || <AddModal type={type} list={workingList} setList={setList} setModalClicked={setModalClicked} exerciseList={exerciseList} />}
            <button className="btn btn-list-view" onClick={() => setModalClicked(true)}>+ add {type==="workout" ? "exercise" : type}</button>
        </div>
    )
}

export default ListView;
