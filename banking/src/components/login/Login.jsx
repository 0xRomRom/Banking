import stl from "./Login.module.css";
import { useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOxTSNU7cO5Uv0hVAD1jTngG-v72FNKOo",
  authDomain: "banking-3af40.firebaseapp.com",
  projectId: "banking-3af40",
  storageBucket: "banking-3af40.appspot.com",
  messagingSenderId: "385341541932",
  appId: "1:385341541932:web:8b03ce501816cf78614b89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const Login = () => {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log(usernameRef.current.value);
    console.log(passwordRef.current.value);
    try {
      const signIn = await signInWithEmailAndPassword(
        auth,
        usernameRef.current.value + "@gmail.com",
        passwordRef.current.value
      );
      navigate("success");
      console.log(signIn);
    } catch (err) {
      console.error(err);
    }
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
              type="username"
              className={stl.inputBox}
              placeholder="Username"
              ref={passwordRef}
            />
          </div>
          <div className={stl.ctaBtns}>
            <button className={stl.ctaBtn} onClick={loginHandler}>
              Login
            </button>
            <button className={stl.ctaBtn}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
