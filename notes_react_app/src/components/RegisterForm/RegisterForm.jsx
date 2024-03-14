import React, { useEffect, useState } from "react";
import cl from "./RegisterForm.module.css"
import NotesInput from "../ui/NotesInput/NotesInput.jsx";
import NotesButton from "../ui/NotesButton/NotesButton.jsx";
import AuthService from "../../services/AuthService.js";
import FieldCheckService from "../../services/FieldCheckService.js";
import useFetching from "../../hooks/useFetching.js"

const RegisterForm = ({ email, password, nickname, setEmail, setPassword, setNickname, setErrorText }) => {
      const [successText, setSuccessText] = useState("");
      const [fetch, error] = useFetching(async () => {
            FieldCheckService.checkNickname(nickname);
            FieldCheckService.checkEmail(email);
            FieldCheckService.checkPassword(password);
            await AuthService.register(email, nickname, password);
            setSuccessText("Вы успешно зарегистрированы");
      });

      useEffect(() => {
            if (!error) 
                  return;
            if (error?.errorText)
                  setErrorText(error.errorText);
            else if (error.response?.data?.error?.name === "ALREADY_EXISTS")
                  setErrorText("Пользователь с таким email уже существует");
            else
                  setErrorText("Что-то пошло не так, попробуйте позднее");            
      }, [error]);

      return (
            <div className={cl.registerForm}>
                  <NotesInput 
                        minLength={2} 
                        maxLength={50} 
                        type="text" 
                        value={nickname} 
                        setValue={setNickname} 
                        placeholder="Имя пользователя" />
                  <NotesInput 
                        minLength={2} 
                        maxLength={300} 
                        type="email" 
                        value={email} 
                        setValue={setEmail} 
                        placeholder="Email" />
                  <NotesInput 
                        minLength={8} 
                        maxLength={30} 
                        type="password" 
                        value={password} 
                        setValue={setPassword} 
                        placeholder="Пароль" />
                  <div className="successText">{successText}</div>
                  <NotesButton onClick={fetch}>
                        Зарегистрироваться
                  </NotesButton>
            </div>
      );
}

export default RegisterForm;
