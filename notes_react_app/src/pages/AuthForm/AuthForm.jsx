import React, {useState} from "react";
import cl from "./AuthForm.module.css";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import RadioChanger from "../../components/RadioChanger/RadioChanger.jsx";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";

const AuthForm = () => {
      const [curForm, setCurForm] = useState("login");
      const [nickname, setNickname] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");      
      const [errorText, setErrorText] = useState("");

      return (
            <div className="authContainter">
                  <div className={cl.authForm} >
                        <div className="authFormHeader">NOTES</div>
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
                                    setNickname={setNickname}                         
                                    setEmail={setEmail}
                                    setPassword={setPassword}                              
                                    setErrorText={setErrorText} />               
                        }                 
                  </div>
            </div>
      );
}

export default AuthForm;
