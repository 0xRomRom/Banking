import stl from "./Vision.module.css";

const Vision = () => {
  return (
    <div className={stl.container}>
      <div className={stl.copyContainer}>
        <p className={stl.copy}>
          Experience a new era of financial freedom with Permissionless Banking.
          Say goodbye to navigating complex processes, waiting for approvals, or
          relying on intermediaries. Unlock the ability to transact, invest,
          borrow, and save on your own terms, as you break free from the
          limitations that once held you back.
        </p>
      </div>
      <div className={stl.containerInner}>
        <h1 className={stl.hero1}>Permissionless</h1>
        <h2 className={stl.hero2}>Transactions</h2>
        <h2 className={stl.hero4}>Fully</h2>
        <h2 className={stl.hero5}>Decentralised</h2>
      </div>
    </div>
  );
};

export default Vision;
