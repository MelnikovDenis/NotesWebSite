import React, {useState} from "react";
import cl from "./AuthForm.module.css";
import LoginForm from "../LoginForm/LoginForm.jsx";
import RadioChanger from "../RadioChanger/RadioChanger.jsx";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";
const AuthForm = () => {
      const [curValue, setCurValue] = useState("login");

      return (
            <div className={cl.authForm} >
                  <RadioChanger 
                        options={[
                              {value: "login", text: "Вход"}, 
                              {value: "register", text: "Регистрация"}]}
                        name="authRadio"
                        curValue={curValue}
                        onChange={e => setCurValue(e.target.value)}
                        />
                  {
                        curValue === "login" ?  <LoginForm /> : <RegisterForm />                 
                  }                 
            </div>
      );
}

export default AuthForm;
