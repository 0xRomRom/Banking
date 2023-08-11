import stl from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const redirectHandler = () => {
    navigate("/");
  };

  return (
    <nav className={stl.navbar}>
      <FontAwesomeIcon
        icon={faBuildingColumns}
        className={stl.logo}
        onClick={redirectHandler}
      />
      <div className={stl.ctawrapper}></div>
    </nav>
  );
};

export default NavBar;
