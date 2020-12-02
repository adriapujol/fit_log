import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import ListView from '../components/List/ListView'

function ExerciseListView({ type, list, setList, setSecondList, setCurrExerciseName }) {
    return (
        <>
            <Navbar />
            <ListView type={type} list={list} setList={setList} setSecondList={setSecondList} setCurrExerciseName={setCurrExerciseName} />
        </>
    )
}

export default ExerciseListView;
