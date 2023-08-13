import stl from "./Login.module.css";
import { useRef, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "./NavBar";
import { ThreeCircles } from "react-loader-spinner";
import { getDatabase, ref, set } from "firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBOxTSNU7cO5Uv0hVAD1jTngG-v72FNKOo",
  authDomain: "banking-3af40.firebaseapp.com",
  databaseURL:
    "https://banking-3af40-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "banking-3af40",
  storageBucket: "banking-3af40.appspot.com",
  messagingSenderId: "385341541932",
  appId: "1:385341541932:web:8b03ce501816cf78614b89",
};

initializeApp(firebaseConfig);
const auth = getAuth();

const db = getDatabase();

const Login = (props) => {
  const navigate = useNavigate();
  const loginUsernameRef = useRef(null);
  const loginPasswordRef = useRef(null);
  const registryUsernameRef = useRef(null);
  const registryPasswordRef = useRef(null);

  const [loginError, setLoginError] = useState(false);
  const [errorState, setErrorState] = useState("");
  const [registering, setRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const newUser = {
    balance: 500,
    savings: 0,
    borrowed: 0,
    displayName: "",
  };

  const loginHandler = async (e) => {
    setLoginError(false);
    e.preventDefault();
    setLoading(true);
    if (loginUsernameRef.current.value.length < 4) {
      setErrorState("Username too short");
      setLoginError(true);
      setLoading(false);
      return;
    }
    if (loginPasswordRef.current.value.length < 6) {
      setErrorState("Password too short");
      setLoginError(true);
      setLoading(false);
      return;
    }
    try {
      const signIn = await signInWithEmailAndPassword(
        auth,
        loginUsernameRef.current.value + "@gmail.com",
        loginPasswordRef.current.value
      );
      props.setUser(signIn);
      navigate("/bank");
      setLoading(false);
    } catch (err) {
      setErrorState("Invalid credentials");
      setLoginError(true);
      console.error(err);
      setLoading(false);
    }
  };

  const registered = async (e) => {
    e.preventDefault();
    setLoginError(false);
    if (registryUsernameRef.current.value.length < 4) {
      setErrorState("Username too short");
      setLoginError(true);
      return;
    }
    if (registryPasswordRef.current.value.length < 6) {
      setErrorState("Password too short");
      setLoginError(true);
      return;
    }

    try {
      const register = await createUserWithEmailAndPassword(
        auth,
        registryUsernameRef.current.value + "@gmail.com",
        registryPasswordRef.current.value
      );

      await set(ref(db, "users/" + register.user.uid), newUser);

      navigate("/bank");
      props.setUser(register);
    } catch (err) {
      setLoginError(true);
      setErrorState("Invalid credentials");
      console.error(err);
    }
  };

  const registerHandler = (e) => {
    e.preventDefault();
    setRegistering(true);
    setLoginError(false);
  };

  const returnToLogin = () => {
    setLoginError(false);
    setRegistering(false);
  };

  return (
    <div className={stl.loginpage}>
      <NavBar />
      {!registering && (
        <div className={stl.loginModal}>
          <form>
            <div className={stl.nameInput}>
              <input
                type="username"
                className={stl.inputBox}
                placeholder="Username"
                ref={loginUsernameRef}
              />
            </div>
            <div className={stl.passInput}>
              <input
                type="password"
                className={stl.inputBox}
                placeholder="Password"
                ref={loginPasswordRef}
              />
            </div>
            {loginError ? (
              <span className={stl.errorTxt}>{errorState}</span>
            ) : (
              ""
            )}

            <div className={stl.ctaBtns}>
              <button className={stl.ctaBtn} onClick={loginHandler}>
                {loading ? (
                  <ThreeCircles
                    height="25"
                    width="25"
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor=""
                    middleCircleColor=""
                  />
                ) : (
                  "Log in"
                )}
              </button>
              <button className={stl.ctaBtn} onClick={registerHandler}>
                Register
              </button>
            </div>
          </form>
        </div>
      )}
      {registering && (
        <div className={stl.loginModal}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={stl.arrowBack}
            onClick={returnToLogin}
          />
          <form>
            <div className={stl.nameInput}>
              <input
                type="username"
                className={stl.inputBox}
                placeholder="Username"
                ref={registryUsernameRef}
              />
            </div>
            <div className={stl.passInput}>
              <input
                type="password"
                className={stl.inputBox}
                placeholder="Password"
                ref={registryPasswordRef}
              />
            </div>
            {loginError ? (
              <span className={stl.errorTxt}>{errorState}</span>
            ) : (
              ""
            )}

            <div className={stl.ctaBtns}>
              <button className={stl.ctaBtn} onClick={registered}>
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default Login;
