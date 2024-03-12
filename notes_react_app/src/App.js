import React from "react";
import NotesModal from "./components/ui/NotesModal/NotesModal.jsx";
import AuthForm from "./components/AuthForm/AuthForm.jsx";

function App() {
  return (
    <div className="App">
      <NotesModal visible={true}>
        <AuthForm />
      </NotesModal>
    </div>
  );
}

export default App;