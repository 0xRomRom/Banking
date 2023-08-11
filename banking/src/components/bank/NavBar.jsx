import stl from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const navigate = useNavigate();

  const redirectHandler = () => {
    props.setUser({});
    navigate("/");
  };

  return (
    <nav className={stl.navbar}>
      <FontAwesomeIcon icon={faBuildingColumns} className={stl.logo} />

      <button className={stl.loginBtn} onClick={redirectHandler}>
        Log out
      </button>
    </nav>
  );
};

export default NavBar;
