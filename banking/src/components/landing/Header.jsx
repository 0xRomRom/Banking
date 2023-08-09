import stl from "./Header.module.css";
import banner from "../../assets/BankBanner.webp";
import { useEffect, useState } from "react";

const Header = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={stl.container}>
      <div className={stl.innerContainer}>
        <img
          src={banner}
          alt="Company Banner"
          className={`${stl.bannerImg} ${loaded ? stl.fadeIn : ""}`}
        />
        <div className={`${stl.titleBox} ${loaded ? stl.fadeIn : ""}`}>
          <h1 className={stl.hero1}>Decentralised</h1>
          <h2 className={stl.hero2}>Banking</h2>
          <h2 className={stl.hero3}>With</h2>
          <h2 className={stl.hero4}>0%</h2>
          <h2 className={stl.hero5}>Fees</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
