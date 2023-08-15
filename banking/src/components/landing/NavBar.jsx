import stl from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/BankLogo.png"

const NavBar = () => {
  const navigate = useNavigate();

  const redirectHandler = () => {
    navigate("login");
  };

  return (
    <nav className={stl.navbar}>
      <img src={logo} alt="Bank" className={stl.logo} />
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
