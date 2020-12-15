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




function App() {

  const exercises_data = [...ExercisesList];
  // const workouts_data = [...WorkoutsList];
  // const exercises_data = [];
  // const workouts_data = [];

  const [exercises, setExercises] = useState(exercises_data);
  const [workouts, setWorkouts] = useState([]);
  const [currWorkoutName, setCurrWorkoutName] = useState("Push");
  const [currExerciseName, setCurrExerciseName] = useState();

  //-----------------------------DATABASE testing--------------------//

  const [dbTester, setDbTester] = useState([]);
  console.log('+++++++++++++++++')
  // console.log(auth.currentUser.uid);
  // console.log(auth.currentUser);

  useEffect(() => {
    // let workoutList_data = 
    // console.log('+++++33333++++')
    // console.log(auth.currentUser.uid);
    // console.log('++33333+++++++')
    db.collection(`test/${auth.currentUser.uid}/data/`).doc('workouts')
      .onSnapshot(doc => {
        console.log("Current data: ", doc.data())
        if (doc.data() !== undefined) setWorkouts(doc.data().workouts);
      });

    // workoutList_data.get().then(doc => {
    //   if (doc.exists) {
    //     console.log("Document data: ", doc.data());
    //     if (Object.keys(doc.data()).length > 0) setWorkouts(doc.data().workouts);
    //   } else {
    //     console.log("No such document");
    //   }
    // }).catch(error => {
    //   console.log("Error getting document: ", error);
    // })
    // db.collection('test/BLx3w0Kb4PvAfNIgpdU8/data/').onSnapshot(snapshot => {
    // console.log("to set Workouts: ", snapshot.docs.map(doc => {if(doc.data().workouts) return doc.data()}))
    // let workoutsTest = snapshot.docs('workouts').data();
    // console.log("----------")
    // console.log(workoutsTest)
    // console.log("----------")

    // let toArray = [];
    // for (let key in workoutsTest[0]) {
    //   toArray.push(workoutsTest[0][key]);
    // }
    // console.log("-----TO ARRAY-----")
    // console.log(toArray)
    // console.log(workoutsTest[0][0])
    // console.log("----------")
    // setDbTester(toArray);
    // })

    db.collection(`test/${auth.currentUser.uid}/data/`).doc('workouts').onSnapshot(snapshot => {
      console.log(snapshot.data())
      // workoutsTest = snapshot.data().map(workout => workout);
      // console.log("WORKOUTS TEST: ", workoutsTest)
      // setWorkouts(workoutsTest);
    })

  }, [])

  const onTest = workouts => {

    db.collection(`test/${auth.currentUser.uid}/data/`).doc('workouts').set({
      workouts
    });
    db.collection(`test/${auth.currentUser.uid}/data/`).onSnapshot(snapshot => {
      console.log("++++++++++++++++")
      console.log(snapshot.docs.map(doc => doc.data()))
      console.log("++++++++++++++++")
    })
  }

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
    onTest();
  }

  // useEffect(() => {
  //   onTest();
  // }, [workouts])

  let currW = workouts.find(w => w.name === currWorkoutName);

  let currE = exercises.find(ex => ex.name === currExerciseName);

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
              <ListView type="workouts" list={workouts} setList={setWorkouts} setCurrWorkoutName={setCurrWorkoutName} saveDB={onTest} />
            </PrivateRoute>
            <PrivateRoute path="/fit_log/exercises">
              <Navbar />
              <ListView type="exercises" list={exercises} setList={setExercises} setSecondList={setWorkouts} setCurrExerciseName={setCurrExerciseName} />
            </PrivateRoute>
            <PrivateRoute exact path={`/fit_log/workout-detail`}>
              <Navbar />
              <ListView type="workout" list={currW} setList={setWorkouts} exerciseList={exercises} setCurrExerciseName={setCurrExerciseName} />
            </PrivateRoute>
            <PrivateRoute path={`/fit_log/exercise-detail`}>
              <Navbar />
              <ExerciseView exercise={currE} />
            </PrivateRoute>
            <PrivateRoute path={`/fit_log/workout-detail/start`}>
              <Navbar />
              <Workout workout={currW} setWorkingWorkout={handleSaveWorkout} exerciseList={exercises} />
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
