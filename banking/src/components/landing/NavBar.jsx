import stl from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const redirectHandler = () => {
    navigate("login");
  };

  return (
    <nav className={stl.navbar}>
      <FontAwesomeIcon icon={faBuildingColumns} className={stl.logo} />
      <div className={stl.ctawrapper}>
        <ul className={stl.ctaUl}>
          <li>About</li>
          <li>Vision</li>
          <li>Partners</li>
        </ul>
      </div>
      <button className={stl.loginBtn} onClick={redirectHandler}>
        Log in
      </button>
    </nav>
  );
};

export default NavBar;
