import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import MainPage from "./pages/MainPage.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes path="/">
          <Route path="/" element={<AuthPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>        
      </BrowserRouter>
      
    </div>
  );
}

export default App;