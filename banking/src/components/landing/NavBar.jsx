import stl from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
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
      <button className={stl.loginBtn}>Log in</button>
    </nav>
  );
};

export default NavBar;
