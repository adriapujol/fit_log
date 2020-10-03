import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className="App">
      <Button onClick={() => alert("hi")}>Hello World</Button>
    </div>
  );
}

export default App;
