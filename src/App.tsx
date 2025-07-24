import React from 'react';
import './App.css';
import SCSPRBalance from './SCSPRBalance';
import Stake from './Stake';

function App() {

  return (
    <div className="App">
        <div style={{marginTop: '50px'}}>
            <Stake />
        </div>
        <div style={{marginTop: '50px'}}>
            <SCSPRBalance />
        </div>
    </div>
  );
}

export default App;
