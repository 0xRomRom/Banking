import stl from "./Vision.module.css";

const Vision = () => {
  return (
    <div className={stl.container}>
      <div className={stl.copyContainer}>
        <p className={stl.copy}>
          Permissionless Banking breaks down the walls that have long confined
          your financial choices. No longer do you need to navigate cumbersome
          processes, wait for approvals, or deal with intermediaries to access
          essential financial services. With Permissionless Banking, you have
          the power to transact, invest, borrow, and save on your terms.
        </p>
      </div>
      <div className={stl.containerInner}>
        <h1 className={stl.hero1}>Trustless</h1>
        <h2 className={stl.hero2}>Monetary</h2>
        <h2 className={stl.hero4}>Fully</h2>
        <h2 className={stl.hero5}>Peer-to-Peer</h2>
      </div>
    </div>
  );
};

export default Vision;
