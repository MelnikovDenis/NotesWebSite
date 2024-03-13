import React from "react";
import cl from "./LoginForm.module.css"
import NotesInput from "../ui/NotesInput/NotesInput.jsx";
import NotesButton from "../ui/NotesButton/NotesButton.jsx";
import AuthService from "../../services/AuthService.js";
const LoginForm = ({email, password, setEmail, setPassword, setErrorText}) => {      
      const onClick = async (event) => {            
            try {
                  event.preventDefault();
                  const response = await AuthService.login(email, password);
                  localStorage.setItem("accessToken", response.data.accessToken);
                  localStorage.setItem("id", response.data.id);
                  localStorage.setItem("email", response.data.email);
            }
            catch(error) {
                  if(error.response?.data?.error?.name === "AUTHENTICATION_ERROR")
                        setErrorText("Неправильный email или пароль");
                  else
                        setErrorText("Что-то пошло не так, попробуйте позднее");
            }
      }
      return (
            <div className={cl.loginForm}>
                  <NotesInput maxLength={300} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                  <NotesInput maxLength={30} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
                  <NotesButton onClick={onClick} type="submit">Войти</NotesButton>
            </div>
      );
}

export default LoginForm;
