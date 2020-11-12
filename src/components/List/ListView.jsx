import React, { useState } from 'react';
import './List.scss';
import List from './List';
import { Link, useLocation } from "react-router-dom";
import AddModal from './AddModal';

function ListView({ type, list, setList, setSecondList, exerciseList, setCurrWorkoutName, setCurrExerciseName }) {

    const [modalClicked, setModalClicked] = useState(false);
    const location = useLocation();

    // const workingList = type !== "workout" ? list : list.exercises;

    return (
        <div className="content">
            <div className="list-title">{type==="workout" ? list.name : type}</div>
            <List type={type} list={list} setList={setList} setSecondList={setSecondList} setCurrWorkoutName={setCurrWorkoutName} setCurrExerciseName={setCurrExerciseName} />
            {
                !modalClicked || <AddModal 
                                    type={type}
                                    list={list} 
                                    setList={setList} 
                                    setModalClicked={setModalClicked} 
                                    exerciseList={exerciseList} 
                                />
            }
            <button className="btn btn-list-view" onClick={() => setModalClicked(true)}>+ add {type==="workout" ? "exercise" : type}</button>
            {type !== "workout" || <Link to={`${location.pathname}/start`} className="btn btn-list-view">Start workout</Link>}
        </div>
    )
}

export default ListView;
