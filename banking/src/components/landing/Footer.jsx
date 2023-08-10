import stl from "./Footer.module.css";
import biglogo from "../../assets/BankBanner.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className={stl.footer}>
      <div className={stl.footerInner}>
        <div className={stl.footerLeftblock}>
          <FontAwesomeIcon icon={faBuildingColumns} className={stl.biglogo} />
        </div>
        <div className={stl.footerRightblock}>
          <h2 className={stl.trusted}>
            Trusted Since
            <br />
            1969
          </h2>
          <div className={stl.registerBox}>
            <h2 className={stl.register}>Register</h2>
            <button className={stl.todayCta}>Today</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
