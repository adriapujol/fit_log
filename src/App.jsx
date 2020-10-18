import React, { useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar.jsx';
import Workouts from './components/WorkoutList/Workouts';
import ListView from './components/List/ListView';



function App() {

  const workout_list = [
    {
      name: "Push",
      last_day: "30/12/2020",
    },
    {
      name: "Pull",
      last_day: "1/1/2020"
    },
    {
      name: "Legs",
      last_day: "13/10/2020"
    },
    {
      name: "Upper",
      last_day: "13/10/2020"
    },
    {
      name: "Lower",
      last_day: ""
    },

  ];
  const exercise_list = [
    {
      name: "Push ups",
      sets: 5,
      reps: 5
    },
    {
      name: "Flat bench press",
      sets: 5,
      reps: 5
    },
    {
      name: "Military press",
      sets: 5,
      reps: 5
    },
    {
      name: "Incline dumbbell press",
      sets: 5,
      reps: 5
    },
    {
      name: "Bicep curls",
      sets: 5,
      reps: 5
    },

  ];

  //to control workout or exercise view before setting routing
  const [viewWorkouts, setViewWorkouts] = useState(false);

  const [exercises, setExercises] = useState(exercise_list);
  const [workouts, setWorkouts] = useState(workout_list);


  return (
    <div className="App">
      <Navbar setViewWorkouts={setViewWorkouts} />
      <main className="content-wrapper">
        {
          viewWorkouts ?
            <ListView type="workouts" listTitle="workouts" list={workouts} setList={setWorkouts} />
            :
            <ListView type="exercises" listTitle="exercises" list={exercises} setList={setExercises} />
        }
      </main>
    </div>
  );
}

export default App;
