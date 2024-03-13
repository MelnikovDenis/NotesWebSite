import React from "react";
import NotesModal from "../components/ui/NotesModal/NotesModal.jsx";
import AuthForm from "../components/AuthForm/AuthForm.jsx";

const AuthPage = () => {
      return (
            <NotesModal visible={true}>
                  <AuthForm />
            </NotesModal>
      );
}

export default AuthPage;
