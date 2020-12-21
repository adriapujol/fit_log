import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.scss';
import ExercisesList from './exercises.json';
import WorkoutsList from './workouts.json';
import Navbar from './components/Navbar/Navbar.jsx';
import ListView from './components/List/ListView';
import Workout from './components/Workout/Workout';
import ExerciseView from './components/Exercise/ExerciseView';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import ForgotPassowrd from './components/ForgotPassword/ForgotPassword';
import Dashboard from './components/Dashboard/Dashboard';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import About from './components/About/About';
import { db } from './Firebase';
import { useAuth } from './contexts/AuthContext';





function App() {

  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [currWorkoutName, setCurrWorkoutName] = useState();
  const [currExerciseName, setCurrExerciseName] = useState();

  //--------------Getting Data--------------------//

  const { currentUser } = useAuth();

  // Prevent first two runs of updating database 
  const workoutsRunsCount = useRef(0);
  const exercisesRunsCount = useRef(0);


  useEffect(() => {

    async function getUserData(dbRef) {
      await dbRef
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.exists) {
              if (doc.id === "workouts") {
                setWorkouts(doc.data().workouts);
              } else if (doc.id === "exercises") {
                setExercises(doc.data().exercises);
              }
            }
          })
        })
        .catch(err => {
          console.log("Error getting data: ", err);
        });
    }
    if (currentUser) {
      let dbRef = db.collection(`users/${currentUser.uid}/data/`);
      getUserData(dbRef);
    }
    return () => {
      workoutsRunsCount.current = 0;
      exercisesRunsCount.current = 0;
    }
  }, [currentUser])


  const updateDatabase = useCallback(
    (type, data) => {
      if (currentUser) {
        if (type === "workouts") {
          let workouts = data;
          db.collection(`users/${currentUser.uid}/data/`).doc('workouts').set({
            workouts
          });
        } else if (type === "exercises") {
          let exercises = data;
          db.collection(`users/${currentUser.uid}/data/`).doc('exercises').set({
            exercises
          });
        }
      }
    },
    [currentUser],
  );

  useEffect(() => {
    if (workoutsRunsCount.current < 2) {
      workoutsRunsCount.current = workoutsRunsCount.current + 1;
      return
    }
    updateDatabase("workouts", workouts)
  }, [workouts, updateDatabase])

  useEffect(() => {
    if (exercisesRunsCount.current < 2) {
      exercisesRunsCount.current = exercisesRunsCount.current + 1;
      return
    }
    updateDatabase("exercises", exercises)
  }, [exercises, updateDatabase])


  //----------------------------------------------------------------//



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


  let currW, currE;
  if (workouts !== undefined) currW = workouts.find(w => w.name === currWorkoutName);
  if (exercises !== undefined) currE = exercises.find(ex => ex.name === currExerciseName);

  /*TYPES OF DATA
    workout list has type = workouts
    exercise list has type = exercises
    workout view has type = workout
  */


  return (

    <div className="App">
      <main className="content-wrapper">
        <Switch>
          <Route path={"/fit_log/login"}>
            <Login />
          </Route>
          <Route path={"/fit_log/register"}>
            <Register />
          </Route>
          <PrivateRoute exact path={["/fit_log/", "/fit_log/dashboard"]}>
            <Navbar />
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/fit_log/update-profile">
            <Navbar />
            <UpdateProfile />
          </PrivateRoute>
          <PrivateRoute exact path={"/fit_log/workouts"}>
            <Navbar />
            <ListView type="workouts" list={workouts} setList={setWorkouts} setCurrWorkoutName={setCurrWorkoutName} />
          </PrivateRoute>
          <PrivateRoute path="/fit_log/exercises">
            <Navbar />
            <ListView type="exercises" list={exercises} setList={setExercises} setSecondList={setWorkouts} setCurrExerciseName={setCurrExerciseName} />
          </PrivateRoute>
          <PrivateRoute exact path={`/fit_log/workout-detail`}>
            <Navbar />
            {
              currW !== undefined ?
                <ListView type="workout" list={currW} setList={setWorkouts} exerciseList={exercises} setCurrExerciseName={setCurrExerciseName} />
                :
                <ListView type="workouts" list={workouts} setList={setWorkouts} setCurrWorkoutName={setCurrWorkoutName} />
            }
          </PrivateRoute>
          <PrivateRoute path={`/fit_log/exercise-detail`}>
            <Navbar />
            {
              currE !== undefined ?
                <ExerciseView exercise={currE} />
                :
                <ListView type="exercises" list={exercises} setList={setExercises} setSecondList={setWorkouts} setCurrExerciseName={setCurrExerciseName} />
            }
          </PrivateRoute>
          <PrivateRoute path={`/fit_log/workout-detail/start`}>
            <Navbar />
            {
              currW !== undefined ?
                <Workout workout={currW} setWorkingWorkout={handleSaveWorkout} exerciseList={exercises} />
                :
                <ListView type="workouts" list={workouts} setList={setWorkouts} setCurrWorkoutName={setCurrWorkoutName} />
            }
          </PrivateRoute>
          <Route path="/fit_log/forgot-password">
            <ForgotPassowrd />
          </Route>
          <PrivateRoute>
            <Navbar />
            <div className="content not-found">
              <div className="not-found-box">
                Page not found
              </div>
            </div>
          </PrivateRoute>
        </Switch>
      </main>
    </div>

  );
}

export default App;
