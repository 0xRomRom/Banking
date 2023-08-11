import stl from "./Bank.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { useState, useRef } from "react";
import NavBar from "./NavBar";

const Bank = (props) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [hasDisplayName, setHasDisplayName] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const displayRef = useRef();
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorTxt, setUsernameErrorTxt] = useState("");

  const nameSetupHandler = (e) => {
    e.preventDefault();
    setUsernameError(false);
    if (displayRef.current.value.length < 5) {
      setUsernameError(true);
      setUsernameErrorTxt("Username too short");
      return;
    }
    if (displayRef.current.value.length > 15) {
      setUsernameError(true);
      setUsernameErrorTxt("Username too long");
      return;
    }
    updateProfile(auth.currentUser, {
      displayName: displayRef.current.value,
    })
      .then(() => {
        // Profile updated!
        // ...
        console.log(auth.currentUser.displayName);
        setHasDisplayName(true);
        setDisplayName(auth.currentUser.displayName);
      })
      .catch((error) => {
        setHasDisplayName(false);
        // An error occurred
        // ...
      });
  };

  useEffect(() => {
    if (Object.keys(props.user).length === 0) {
      navigate("/login");
      return;
    }
    if (props.user.user.displayName === null) {
      setHasDisplayName(false);
      return;
    }
    setHasDisplayName(true);
  }, [props.user, navigate, props.user.user?.displayName]);
  return (
    <div className={stl.bankpage}>
      <NavBar setUser={props.setUser} user={props.user} />
      {!hasDisplayName && (
        <div className={stl.nameSetup}>
          <form className={stl.form}>
            <h2 className={stl.displayText}>
              Hi! It seems like you're new.
              <br />
              What display name would you like to use?
            </h2>
            <input type="username" ref={displayRef} className={stl.nameInput} />

            {usernameError && (
              <span className={stl.errorMsg}>{usernameErrorTxt}</span>
            )}

            <button onClick={nameSetupHandler} className={stl.confirm}>
              Confirm
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Bank;
