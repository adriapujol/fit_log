import React, { useState } from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar.jsx';
import ListView from './components/List/ListView';
import Exercise from './components/Exercise/Exercise';



function App() {

  const workout_list = [
    {
      name: "Push",
      last_day: "30/12/2020",
      exercises: [
        {
          name: "Push ups",
          sets: 5,
          reps: 5
        },
        {
          name: "Military press",
          sets: 3,
          reps: 5
        }    
      ]
    },
    {
      name: "Pull",
      last_day: "1/1/2020",
      exercises: []
    },
    {
      name: "Legs",
      last_day: "13/10/2020",
      exercises: []
    },
    {
      name: "Upper",
      last_day: "13/10/2020",
      exercises: []
    },
    {
      name: "Lower",
      last_day: "",
      exercises: []
    },

  ];

  const exercise_list = [
    {
      name: "Push ups",
      history: [
        {
          date: "30/10/2020",
          sets: [
            {
              set: 1,
              reps: 5,
              weight: 50
            },
            {
              set: 2,
              reps: 5,
              weight: 50
            },
            {
              set: 3,
              reps: 3,
              weight: 50
            }
          ]
        },
        {
          date: "03/11/2020",
          sets: [
            {
              set: 1,
              reps: 5,
              weight: 60
            },
            {
              set: 2,
              reps: 5,
              weight: 60
            },
            {
              set: 3,
              reps: 5,
              weight: 60
            }
          ]
        }
      ]
    },
    {
      name: "Flat bench press",
      history: {}
    },
    {
      name: "Military press",
      history: {}
    },
    {
      name: "Incline dumbbell press",
      history: {}
    },
    {
      name: "Bicep curls",
      history: {}
    },

  ];

  //to control workout or exercise view before setting routing
  const [viewWorkouts, setViewWorkouts] = useState(true);

  const [exercises, setExercises] = useState(exercise_list);
  const [workouts, setWorkouts] = useState(workout_list);
  const [workout, setWorkout] = useState();

  /*TYPES OF DATA
    workout list has type = workouts
    exercise list has type = exercises
    workout view has type = workout
  */

  //this is for developing puropses

  const workoutsView = false;
  const exercisesView = false;
  const workoutView = false;

  return (
    <div className="App">
      <Navbar setViewWorkouts={setViewWorkouts} />
      <main className="content-wrapper">
        {
          // viewWorkouts ?
          //   <ListView type="workouts" listTitle="workouts" list={workouts} setList={setWorkouts} />
          //   :
          //   <ListView type="exercises" listTitle="exercises" list={exercises} setList={setExercises} />
        }

        {
          // list views, EXERCISE LIST; WORKOUT LIST; WORKOUT EXERCISE LIST
        }

        {/* {workoutsView || <ListView type="workouts" list={workouts} setList={setWorkouts} />}

        {exercisesView || <ListView type="exercises" list={exercises} setList={setExercises} />}

        {workoutView || <ListView type="workout" list={workouts[0]} setList={setWorkouts} exerciseList={exercises} workoutsList={workouts} />} */}

        {
          // Exercise, history
        }
        <Exercise workout={workouts[0]} />

      </main>
    </div>
  );
}

export default App;
