import React from "react";
import cl from "./RegisterForm.module.css"
import NotesInput from "../ui/NotesInput/NotesInput.jsx";
import NotesButton from "../ui/NotesButton/NotesButton.jsx";

const RegisterForm = () => {
      return (
            <form className={cl.registerForm}>
                  <NotesInput type="email" placeholder="Email" />
                  <NotesInput type="password" placeholder="Пароль" />
                  <NotesButton type="submit">Зарегистрироваться</NotesButton>
            </form>
      );
}

export default RegisterForm;
