import stl from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NavBar = (props) => {
  const navigate = useNavigate();

  const redirectHandler = () => {
    props.setUser({});
    navigate("/");
  };

  return (
    <nav className={stl.navbar}>
      <FontAwesomeIcon icon={faBuildingColumns} className={stl.logo} />

      <div className={stl.rightblock}>
        <span className={stl.username}>
          {props.user.user?.displayName === null
            ? ""
            : "Welcome " + props.user.user?.displayName}
        </span>
        <button className={stl.loginBtn} onClick={redirectHandler}>
          Log out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
