import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import io from 'socket.io-client';

function App() {
  const [kafkaData, setFakfaData] = useState(2)


    var socket = io('http://localhost:3000');
    socket.on('event', (value) => {
      setFakfaData(value);
      console.log("Function webSocketInvocke")
    });
  


  return (
    <div className="App">
      <header className="App-header">
        { kafkaData }
      </header>
    </div>
  );
}

export default App;
