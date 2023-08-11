import stl from "./SetupUsername.module.css";
import { useRef, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";

const SetupUsername = (props) => {
  const auth = getAuth();
  const displayRef = useRef();
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorTxt, setUsernameErrorTxt] = useState("");
  const [displayName, setDisplayName] = useState("");

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
        props.setHasDisplayname(true);
        setDisplayName(auth.currentUser.displayName);
      })
      .catch((error) => {
        props.setHasDisplayname(false);
        // An error occurred
        // ...
      });
  };

  return (
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
  );
};

export default SetupUsername;
