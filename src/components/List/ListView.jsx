import React, { useState } from 'react';
import './List.scss';
import List from './List';
import AddModal from './AddModal';

function ListView({ type, listTitle, list, setList }) {

    const [modalClicked, setModalClicked] = useState(false);

    return (
        <div className="content">
            <div className="list-title">{listTitle}</div>
            <List type={type} list={list} />
            {!modalClicked || <AddModal type={type} list={list} setList={setList} setModalClicked={setModalClicked} />}
            <button className="btn btn-list-view" onClick={() => setModalClicked(true)}>+ add {type}</button>
        </div>
    )
}

export default ListView;
