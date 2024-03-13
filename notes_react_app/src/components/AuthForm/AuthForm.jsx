import React, {useState} from "react";
import cl from "./AuthForm.module.css";
import LoginForm from "../LoginForm/LoginForm.jsx";
import RadioChanger from "../RadioChanger/RadioChanger.jsx";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";

const AuthForm = () => {
      const [curForm, setCurForm] = useState("login");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [nickname, setNickname] = useState("");
      const [errorText, setErrorText] = useState("");

      return (
            <div className={cl.authForm} >
                  <RadioChanger 
                        options={[
                              {value: "login", text: "Вход"}, 
                              {value: "register", text: "Регистрация"}]}
                        name="authRadio"
                        curValue={curForm}
                        onChange={e => {setCurForm(e.target.value); setErrorText("");}} />
                  <div className="errorText">
                        {errorText}
                  </div>
                  {
                        curForm === "login" ?  
                        <LoginForm 
                              email={email} 
                              password={password}
                              setEmail={setEmail}
                              setPassword={setPassword}
                              setErrorText={setErrorText} /> : 
                        <RegisterForm
                              nickname={nickname}
                              email={email} 
                              password={password}                           
                              setEmail={setEmail}
                              setPassword={setPassword}
                              setNickname={setNickname}
                              setErrorText={setErrorText} />               
                  }                 
            </div>
      );
}

export default AuthForm;
