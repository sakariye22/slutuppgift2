import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";


import LandingPage from "./pages/Landingpage";
import SecondPage from "./pages/Secondpage";

import App from "./App";

function AppRouter (){
  return (
<BrowserRouter>
<Routes>
    <Route path="/landing" element={<LandingPage />} />
    <Route path="/second" element={<SecondPage />} />
 

 
    
    
    </Routes>
    </BrowserRouter>
  )

}
export default AppRouter;