import React, { useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar.jsx';
import Workouts from './components/WorkoutList/Workouts';



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
  const [viewWorkouts, setViewWorkouts] = useState(true);
  
  const [exercises, setExercises] = useState(exercise_list);
  const [workouts, setWorkouts] = useState(workout_list);


  return (
    <div className="App">
      <Navbar setViewWorkouts={setViewWorkouts} />
      <main className="content-wrapper">
        {
          viewWorkouts ?
            <Workouts workout_list={workouts} setWorkouts={setWorkouts} />

            : "Exercises coming soon"
        
        }
      </main>
    </div>
  );
}

export default App;
