import React from 'react';
import './App.scss';
import Button from 'react-bootstrap/Button';
// import { Nav, Navbar } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from './components/Navbar/Navbar.jsx';


function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container d-flex flex-column justify-content-center">
        <div className="title text-center h3">
          Workouts
        </div>
        {/* <ListGroup>
          <ListGroup.Item>
            <a href="/">Push</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="/">Pull</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="/">Legs</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="/">Upper</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="/">Lower</a>
          </ListGroup.Item>
        </ListGroup> */}
        <Button className="color-nav align-self-center w-50" onClick={() => alert("hi")}>Hello World</Button>
      </main>
    </div>
  );
}

export default App;
