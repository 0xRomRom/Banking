import stl from "./Landing.module.css";
import NavBar from "./NavBar";
import Header from "./Header";

const Landing = () => {
  return (
    <div className={stl.app}>
      <NavBar />
      <Header />
    </div>
  );
};

export default Landing;
