import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import cl from "./LoginForm.module.css"
import NotesInput from "../ui/NotesInput/NotesInput.jsx";
import NotesButton from "../ui/NotesButton/NotesButton.jsx";
import AuthService from "../../services/AuthService.js";
import FieldCheckService from "../../services/FieldCheckService.js";
import useFetching from "../../hooks/useFetching.js"


const LoginForm = ({email, password, setEmail, setPassword, setErrorText}) => {  
      const navigate = useNavigate();

      const [fetch, error] = useFetching(async () => {
            FieldCheckService.checkEmail(email);
            FieldCheckService.checkPassword(password);
            const response = await AuthService.login(email, password);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("email", response.data.email);
            navigate("/main");            
      });          

      useEffect(() => {
            if (!error) 
                  return;
            if (error?.errorText)
                  setErrorText(error.errorText);
            else if(error.response?.data?.error?.name === "AUTHENTICATION_ERROR")
                  setErrorText("Неправильный email или пароль");
            else
                  setErrorText("Что-то пошло не так, попробуйте позднее");        
      }, [error]);

      return (
            <div className={cl.loginForm}>
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
                  <NotesButton onClick={fetch}>
                        Войти
                  </NotesButton>
            </div>
      );
}

export default LoginForm;
