import React, { Component } from 'react';
import FetchUsers from './components/FetchUsers/FetchUsers';
import useStore from './store';
import DT from './components/DT/DT';
import './App.css'
import ApexChart from './components/PieChart/ApexChart';




function App() {

const users = useStore(state=>state.Users)

  return (
    <div className="App">      
     <FetchUsers  />
     <ApexChart />
     <DT />     
    </div>
  );
}

export default App;
