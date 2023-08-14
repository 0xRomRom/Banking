import stl from "./Bank.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "./NavBar";
import SetupUsername from "./SetupUsername";
import UserStats from "./UserStats";
import History from "./History";

const Bank = (props) => {
  const navigate = useNavigate();
  const [hasDisplayName, setHasDisplayName] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [transact, setTransact] = useState(false);

  useEffect(() => {
    if (Object.keys(props.user).length === 0) {
      navigate("/login");
      return;
    }
    if (props.user.user.displayName === null) {
      setHasDisplayName(false);
      return;
    }
    setDisplayName(props.user.user?.displayName);
    setHasDisplayName(true);
  }, [props.user, navigate, props.user.user?.displayName, displayName]);
  return (
    <div className={stl.bankpage}>
      <NavBar
        setUser={props.setUser}
        user={props.user}
        hasDisplayName={hasDisplayName}
        displayName={displayName}
      />
      {!hasDisplayName && (
        <SetupUsername
          setHasDisplayname={setHasDisplayName}
          setDisplayName={setDisplayName}
        />
      )}
      <UserStats
        user={props.user}
        displayName={displayName}
        setTransact={setTransact}
      />
      <History displayName={displayName} transact={transact} />
    </div>
  );
};

export default Bank;
