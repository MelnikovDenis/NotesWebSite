import React from "react";
import cl from "./LoginForm.module.css"
import NotesInput from "../ui/NotesInput/NotesInput.jsx";
import NotesButton from "../ui/NotesButton/NotesButton.jsx";

const LoginForm = ({email, password, setEmail, setPassword}) => {      
      const onClick = (e) => {
            e.preventDefault();
            console.log(`Login: ${email}-${password}`);
      }
      return (
            <div className={cl.loginForm}>
                  <NotesInput type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                  <NotesInput type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
                  <NotesButton onClick={onClick} type="submit">Войти</NotesButton>
            </div>
      );
}

export default LoginForm;
