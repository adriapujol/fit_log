import React, { useState } from 'react';
import './App.scss';
import ExercisesList from './exercises.json';
import WorkoutsList from './workouts.json';
import Navbar from './components/Navbar/Navbar.jsx';
import ListView from './components/List/ListView';
import Workout from './components/Workout/Workout';
import ExerciseView from './components/Exercise/ExerciseView';
import { Route, Switch } from "react-router-dom";



function App() {

  const exercises_data = [...ExercisesList];
  const workouts_data = [...WorkoutsList];

  const [exercises, setExercises] = useState(exercises_data);
  const [workouts, setWorkouts] = useState(workouts_data);
  const [currWorkoutName, setCurrWorkoutName] = useState("Push");
  const [currExerciseName, setCurrExerciseName] = useState();


  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const padded_month = month <= 9 ? "0" + month : month;
    const padded_day = day <= 9 ? "0" + day : day;


    return `${padded_day}/${padded_month}/${year}`;
  }

  const handleSaveWorkout = (name, workout) => {
    const currentDate = getCurrentDate();
    setWorkouts(prevWorkouts => prevWorkouts.map(workout => {
      if (workout.name === name) {
        return { ...workout, last_day: currentDate };
      }
      return workout;
    })
    )

    setExercises(prevExercises => {

      return prevExercises.map(crEx => {
        for (let i = 0; i < workout.length; i++) {
          if (workout[i].name === crEx.name) {
            let currExHistory = [{ date: currentDate, sets: [...workout[i].sets] }, ...crEx.history]
            return { ...crEx, history: currExHistory };
          }
        }
        return crEx;
      })

    })

  }

  let currW = workouts.find(w => w.name === currWorkoutName);

  let currE = exercises.find(ex => ex.name === currExerciseName);


  /*TYPES OF DATA
    workout list has type = workouts
    exercise list has type = exercises
    workout view has type = workout
  */


  return (
    <div className="App">
      <Navbar />
      <main className="content-wrapper">

        <Switch>
          <Route exact path={["/", "/workouts"]}>
            <ListView type="workouts" list={workouts} setList={setWorkouts} setCurrWorkoutName={setCurrWorkoutName} />
          </Route>
          <Route exact path={"/exercises"}>
            <ListView type="exercises" list={exercises} setList={setExercises} setSecondList={setWorkouts} setCurrExerciseName={setCurrExerciseName} />
          </Route>
          <Route exact path={`/workout-detail`}>
            <ListView type="workout" list={currW} setList={setWorkouts} exerciseList={exercises} setCurrExerciseName={setCurrExerciseName} />
          </Route>
          <Route path={`/exercise-detail`}>
            <ExerciseView exercise={currE} />
          </Route>
          <Route path={`/workout-detail/start`}>
            <Workout workout={currW} setWorkingWorkout={handleSaveWorkout} exerciseList={exercises} />
          </Route>
          <Route>
            {"Not found"}
          </Route>
        </Switch>

      </main>
    </div>
  );
}

export default App;
