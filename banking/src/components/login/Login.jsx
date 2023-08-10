import stl from "./Login.module.css";
import { useRef, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBOxTSNU7cO5Uv0hVAD1jTngG-v72FNKOo",
  authDomain: "banking-3af40.firebaseapp.com",
  projectId: "banking-3af40",
  storageBucket: "banking-3af40.appspot.com",
  messagingSenderId: "385341541932",
  appId: "1:385341541932:web:8b03ce501816cf78614b89",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const Login = () => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [errorState, setErrorState] = useState("");

  const loginHandler = async (e) => {
    setLoginError(false);
    e.preventDefault();
    if (usernameRef.current.value.length < 4) {
      setErrorState("Username too short");
      setLoginError(true);
      return;
    }
    if (passwordRef.current.value.length < 6) {
      setErrorState("Password too short");
      setLoginError(true);
      return;
    }
    try {
      const signIn = await signInWithEmailAndPassword(
        auth,
        usernameRef.current.value + "@gmail.com",
        passwordRef.current.value
      );
      navigate("/bank");
      console.log(signIn);
    } catch (err) {
      setErrorState("Invalid credentials");
      setLoginError(true);
      console.error(err);
    }
  };

  const registerHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={stl.loginpage}>
      <div className={stl.loginModal}>
        <form>
          <div className={stl.nameInput}>
            <input
              type="username"
              className={stl.inputBox}
              placeholder="Username"
              ref={usernameRef}
            />
          </div>
          <div className={stl.passInput}>
            <input
              type="password"
              className={stl.inputBox}
              placeholder="Password"
              ref={passwordRef}
            />
          </div>
          {loginError ? <span className={stl.errorTxt}>{errorState}</span> : ""}

          <div className={stl.ctaBtns}>
            <button className={stl.ctaBtn} onClick={loginHandler}>
              Login
            </button>
            <button className={stl.ctaBtn} onClick={registerHandler}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
