import React, { useEffect } from "react";
import { useState } from "react";
import styles from './Login.module.css';
import EmailAtom from "./EmailAtom";
import PasswordAtom from "./PasswordAtom";
import LoginButtonAtom from "./LoginButtonAtom";
//import CompanyRegLinkAtom from "./CompanyRegLinkAtom";
//import StudentRegLinkAtom from "./StudentRegLinkAtom";
import { useLocalHostLogin } from "./LocalHostLoginProvider"; // Import the hook
//import ReCaptcha from "../reCaptcha";
import ReCAPTCHA from "react-google-recaptcha";

const Login = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const {login} =useLocalHostLogin();// use login function

  useEffect (() =>{
         setSubmitEnabled (!!token) // if token is present it becomes true. if token is null it becomes false
   }, [token])
  
   // user clear quiz(I am not a robot) and get token 
  const handleRecaptchaChange =(token) =>{
    setToken(token);
    console.log("Recaptcha: " ,token)
  }

  const handleLogin = async() =>{
    if (!token) {
      console.error("Please complete the reCAPTCHA.");
      return;
    }
    if(login) {
      await login(email, password, token);
    }else {
      console.error ('NO login function')
      console.error('Email:', email );
      console.error('Password:', password);
    }
  };

/*   const handleToken = () =>{
    setToken(token)
  } */

  return (
   <>
   <div className={styles.mainContainer}>
    <div className={styles.loginText}>
        <h1>Login</h1>
    </div>
    
    <div className={styles.loginContainer}>
    
    <EmailAtom  onEmailChange={setEmail}/>
    <PasswordAtom onPasswordChange={setPassword}/>
    <div>
      {/* <ReCaptcha siteKey={'6Ldd0XgqAAAAAOyJ2g-pnxchXHv-sTbP1SHSWyZ1'} callback={handleToken}/> */}
      <ReCAPTCHA
        //sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" //test sitekey
        sitekey="6Ldd0XgqAAAAAOyJ2g-pnxchXHv-sTbP1SHSWyZ1" // my own site key
        onChange={handleRecaptchaChange}
     />

    </div>
    <LoginButtonAtom disabled={!submitEnabled} onClick={handleLogin}/>
{/*     <ul className={styles.noBullet}>
        <li><StudentRegLinkAtom navigation={navToPage}/></li>
        <li><CompanyRegLinkAtom navigation={navToPage}/></li>
    </ul> */}
    
    </div>
    </div>
    </>

  )
}

export default Login