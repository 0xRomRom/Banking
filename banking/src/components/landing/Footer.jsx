import stl from "./Footer.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/BankLogo.png"

const Footer = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("login");
  };

  return (
    <div className={stl.footer}>
      <div className={stl.footerInner}>
        <div className={stl.footerLeftblock}>
          {/* <FontAwesomeIcon icon={faBuildingColumns} className={stl.biglogo} /> */}
          <img src={logo} alt="Bank Logo" className={stl.biglogo} />
        </div>
        <div className={stl.footerRightblock}>
          <h2 className={stl.trusted}>
            Trusted Since
           
            1969
          </h2>
          <div className={stl.registerBox}>
            <h2 className={stl.register}>Register</h2>
            <button className={stl.todayCta} onClick={navigateHandler}>
              Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
