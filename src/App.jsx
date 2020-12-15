import React, { useState, useEffect } from 'react';
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
import { db, auth } from './Firebase';
import { useAuth } from './contexts/AuthContext';





function App() {

  // const exercises_data = [...ExercisesList];
  // const workouts_data = [...WorkoutsList];

  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [currWorkoutName, setCurrWorkoutName] = useState();
  const [currExerciseName, setCurrExerciseName] = useState();

  //-----------------------------DATABASE testing--------------------//

  const [dbLoaded, setDbLoaded] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {

    console.log("USE EFFECT FIRED ON MOUNT")
    if (currentUser) {

      // GET WORKOUT LIST
      db.collection(`test/${currentUser.uid}/data/`).doc('workouts')
        .onSnapshot(doc => {
          console.log("Current data: ", doc.data())
          if (doc.data() !== undefined) {
            if (Object.keys(doc.data()).length > 0) setWorkouts(doc.data().workouts)
          };
        });

      db.collection(`test/${currentUser.uid}/data/`).doc('workouts').onSnapshot(snapshot => {
        console.log(snapshot.data())

      })


      // GET EXERCISE LIST
      db.collection(`test/${currentUser.uid}/data/`).doc('exercises')
        .onSnapshot(doc => {
          console.log("Current data: ", doc.data())
          if (doc.data() !== undefined) {
            if (Object.keys(doc.data()).length > 0) setExercises(doc.data().exercises)
          };
        });

      db.collection(`test/${currentUser.uid}/data/`).doc('exercises').onSnapshot(snapshot => {
        console.log(snapshot.data())

      })
      setDbLoaded(true);
    }

  }, [currentUser])


  const onTest = (type, data) => {
    if (currentUser) {
      if (type === "workouts") {
        let workouts = data;
        db.collection(`test/${currentUser.uid}/data/`).doc('workouts').set({
          workouts
        });
        db.collection(`test/${currentUser.uid}/data/`).onSnapshot(snapshot => {
          console.log("++++++++++++++++")
          console.log(snapshot.docs.map(doc => doc.data()))
          console.log("++++++++++++++++")
        })
      } else if (type === "exercises") {
        let exercises = data;
        db.collection(`test/${currentUser.uid}/data/`).doc('exercises').set({
          exercises
        });
        db.collection(`test/${currentUser.uid}/data/`).onSnapshot(snapshot => {
          console.log("++++++++++++++++")
          console.log(snapshot.docs.map(doc => doc.data()))
          console.log("++++++++++++++++")
        })
      }
    }
  }

  useEffect(() => {
    if (dbLoaded) {
      onTest("workouts", workouts)
    }
  }, [workouts])

  useEffect(() => {
    if (dbLoaded) {
      onTest("exercises", exercises)
    }
  }, [exercises])


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
    // onTest();
  }




  let currW, currE;
  if (workouts !== undefined) currW = workouts.find(w => w.name === currWorkoutName);
  if (exercises !== undefined) currE = exercises.find(ex => ex.name === currExerciseName);


  // let currW = workouts.find(w => w.name === currWorkoutName);

  // let currE = exercises.find(ex => ex.name === currExerciseName);

  // const dbTesting = db.collection('test').doc('test2');
  // console.log(dbTesting);

  // const fakeUID = "3SbmdXJIWLop89HxQUoQ";
  // db.collection('users').add({
  //   first: "ada",
  //   last: "lovelace"
  // }).then(() => {
  //   console.log("this worked")
  // }).catch((error)=>{
  //   console.error(error);
  // });
  // console.log(db.collection('users'));
  // db.collection('users').doc(fakeUID).add({workout: 'shitty'});



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
            <button onClick={onTest}>TEST</button>
          </PrivateRoute>
          <PrivateRoute path="/fit_log/update-profile">
            <Navbar />
            <UpdateProfile />
          </PrivateRoute>
          <PrivateRoute exact path={["/fit_log/", "/fit_log/workouts"]}>
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
            {"Not found"}
          </PrivateRoute>
        </Switch>
      </main>
    </div>

  );
}

export default App;
