import stl from "./Bank.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "./NavBar";
import SetupUsername from "./SetupUsername";

const Bank = (props) => {
  const navigate = useNavigate();
  const [hasDisplayName, setHasDisplayName] = useState(false);

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
      <NavBar
        setUser={props.setUser}
        user={props.user}
        hasDisplayName={hasDisplayName}
      />
      {!hasDisplayName && (
        <SetupUsername setHasDisplayname={setHasDisplayName} />
      )}
    </div>
  );
};

export default Bank;
