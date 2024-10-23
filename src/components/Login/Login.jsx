import React from "react";
import { useState } from "react";
import styles from './Login.module.css';
import EmailAtom from "./EmailAtom";
import PasswordAtom from "./PasswordAtom";
import LoginButtonAtom from "./LoginButtonAtom";
//import CompanyRegLinkAtom from "./CompanyRegLinkAtom";
//import StudentRegLinkAtom from "./StudentRegLinkAtom";
import { useLocalHostLogin } from "./LocalHostLoginProvider"; // Import the hook


const Login = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login} =useLocalHostLogin();// use login function

  const handleLogin = async() =>{
    if(login) {
      await login(email, password);
    }else {
      console.error ('NO login function')
      console.error('Email:', email );
      console.error('Password:', password);
    }
  };

  return (
   <>
    <div className={styles.loginText}>
        <h1>Login</h1>
    </div>
    <div className={styles.loginContainer}>
    
    <EmailAtom  onEmailChange={setEmail}/>
    <PasswordAtom onPasswordChange={setPassword}/>
    <LoginButtonAtom onClick={handleLogin}/>
{/*     <ul className={styles.noBullet}>
        <li><StudentRegLinkAtom navigation={navToPage}/></li>
        <li><CompanyRegLinkAtom navigation={navToPage}/></li>
    </ul> */}
    
    </div>
    </>

  )
}

export default Login