import React from "react";
import cl from "./RegisterForm.module.css"
import NotesInput from "../ui/NotesInput/NotesInput.jsx";
import NotesButton from "../ui/NotesButton/NotesButton.jsx";
import AuthService from "../../services/AuthService.js";

const RegisterForm = ({email, password, nickname, setEmail, setPassword, setNickname, setErrorText}) => {
      const onClick = async (event) => {            
            try {
                  event.preventDefault();
                  const response = await AuthService.register(email, nickname, password);
            }
            catch(error) {
                  console.log(error);
                  if(error.response?.data?.error?.name === "ALREADY_EXISTS")
                        setErrorText("Пользователь с таким email уже существует");
                  else
                        setErrorText("Что-то пошло не так, попробуйте позднее");
            }
      }
      return (
            <div className={cl.registerForm}>
                  <NotesInput maxLength={50} type="text" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Имя пользователя" />
                  <NotesInput maxLength={300} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                  <NotesInput maxLength={30} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
                  <NotesButton onClick={onClick} type="submit">Зарегистрироваться</NotesButton>
            </div>
      );
}

export default RegisterForm;
