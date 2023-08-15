import stl from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/BankLogo.png"
import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


const NavBar = (props) => {
  const navigate = useNavigate();

  const redirectHandler = () => {
    navigate("login");
  };

  return (
    <nav className={stl.navbar}>
      <img src={logo} alt="Bank" className={stl.logo} />
      <div className={stl.ctawrapper}>
        <ul className={stl.ctaUl}>
        <Link activeClass="active" to="about" spy={true} smooth={true} duration={500}>
          <li>About</li>
        </Link>
        <Link activeClass="active" to="vision" spy={true} smooth={true} duration={500}>
          <li>Vision</li>
        </Link>
        <Link activeClass="active" to="register" spy={true} smooth={true} duration={500}>
          <li>Register</li>
        </Link>
        </ul>
      </div>
      <button className={stl.loginBtn} onClick={redirectHandler}>
        Log in
      </button>
    </nav>
  );
};

export default NavBar;
