import React, {useState} from "react";
import cl from "./AuthForm.module.css";
import LoginForm from "../LoginForm/LoginForm.jsx";
import RadioChanger from "../RadioChanger/RadioChanger.jsx";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";
const AuthForm = () => {
      const [curForm, setCurForm] = useState("login");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      return (
            <div className={cl.authForm} >
                  <RadioChanger 
                        options={[
                              {value: "login", text: "Вход"}, 
                              {value: "register", text: "Регистрация"}]}
                        name="authRadio"
                        curValue={curForm}
                        onChange={e => setCurForm(e.target.value)}
                        />
                  {
                        curForm === "login" ?  
                        <LoginForm 
                              email={email} 
                              password={password} 
                              setEmail={setEmail}
                              setPassword={setPassword}/> : 
                        <RegisterForm
                              email={email} 
                              password={password} 
                              setEmail={setEmail}
                              setPassword={setPassword}/>               
                  }                 
            </div>
      );
}

export default AuthForm;
