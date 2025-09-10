import React from 'react';
import './App.css';
import SCSPRBalance from './SCSPRBalance';
import Stake from './Stake';
import APY from "./APY";
import USDRate from './USDRate';

function App() {

  return (
    <div className="App">
        <div style={{marginTop: '50px'}}>
            <Stake />
        </div>
        <div style={{marginTop: '50px'}}>
            <SCSPRBalance />
        </div>
        <div style={{marginTop: '50px'}}>
            <APY />
        </div>
        <div style={{marginTop: '50px'}}>
            <USDRate />
        </div>
    </div>
  );
}

export default App;
