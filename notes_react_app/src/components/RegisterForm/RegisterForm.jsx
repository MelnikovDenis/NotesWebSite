import React from "react";
import cl from "./RegisterForm.module.css"
import NotesInput from "../ui/NotesInput/NotesInput.jsx";
import NotesButton from "../ui/NotesButton/NotesButton.jsx";

const RegisterForm = ({email, password, setEmail, setPassword}) => {
      const onClick = (e) => {
            e.preventDefault();
            console.log(`Register: ${email}-${password}`);
      }
      return (
            <div className={cl.registerForm}>
                  <NotesInput type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                  <NotesInput type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
                  <NotesButton onClick={onClick} type="submit">Зарегистрироваться</NotesButton>
            </div>
      );
}

export default RegisterForm;
