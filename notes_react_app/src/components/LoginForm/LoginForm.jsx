import React from "react";
import cl from "./LoginForm.module.css"
import NotesInput from "../ui/NotesInput/NotesInput.jsx";
import NotesButton from "../ui/NotesButton/NotesButton.jsx";

const LoginForm = () => {
      return (
            <form className={cl.loginForm}>
                  <NotesInput type="email" placeholder="Email" />
                  <NotesInput type="password" placeholder="Пароль" />
                  <NotesButton type="submit">Войти</NotesButton>
            </form>
      );
}

export default LoginForm;
