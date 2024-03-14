import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthForm from "./pages/AuthForm/AuthForm.jsx";
import LeftMenu from "./layouts/LeftMenu/LeftMenu.jsx";
import Group from "./components/Group/Group.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes path="/">
          <Route path="/" element={<AuthForm />} />         
          <Route path="/main/" element={<LeftMenu><></></LeftMenu>} />
          <Route path="/main/:id" element={<LeftMenu><Group /></LeftMenu>} />          
        </Routes>        
      </BrowserRouter>
      
    </div>
  );
}

export default App;