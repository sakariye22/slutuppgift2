import React from 'react';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

import AppRouter from './AppRouter';
 




function App() {
  return (
    <div className="App">
 
   <AppRouter></AppRouter>
  
   
  
    </div>
  );
}

export default App;
