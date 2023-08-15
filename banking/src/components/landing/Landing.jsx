import stl from "./Landing.module.css";
import NavBar from "./NavBar";
import Header from "./Header";
import About from "./About";
import Vision from "./Vision";
import Footer from "./Footer";

const Landing = () => {



  return (
    <div className={stl.app}>
      <NavBar />
      <Header />
      <About />
      <Vision />
      <Footer />
    </div>
  );
};

export default Landing;
