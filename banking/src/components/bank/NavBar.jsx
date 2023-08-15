import stl from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/BankLogo.png"

const NavBar = (props) => {
  const navigate = useNavigate();

  const redirectHandler = () => {
    props.setUser({});
    navigate("/");
  };

  return (
    <nav className={stl.navbar}>
      <img src={logo} alt="Bank Logo" className={stl.logo} />

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
