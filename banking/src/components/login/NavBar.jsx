import stl from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/BankLogo.png"

const NavBar = () => {
  const navigate = useNavigate();

  const redirectHandler = () => {
    navigate("/");
  };

  return (
    <nav className={stl.navbar}>
      <img src={logo} alt="Bank" className={stl.logo} onClick={redirectHandler} />
      <div className={stl.ctawrapper}></div>
    </nav>
  );
};

export default NavBar;
