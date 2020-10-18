import React from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar.jsx';
import Workouts from './components/WorkoutList/Workouts';


function App() {

  const workout_list = [
    {
      name: "Push",
      last_day: "30/12/2020"
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
    }
  ];


  return (
    <div className="App">
      <Navbar />
      <main className="content-wrapper">
        <Workouts workout_list={workout_list} />
      </main>
    </div>
  );
}

export default App;
