import stl from "./UserStats.module.css";

const UserStats = () => {
  return (
    <div className={stl.container}>
      <div className={stl.balanceBlock}>
        <h2 className={stl.balanceTitle}>Balance</h2>
        <span className={stl.balanceAmount}>$1,299.40</span>
      </div>
      <div className={stl.statsCtaBlock}>
        <button className={stl.sendBtn}>Send</button>
        <button className={stl.requestLoanBtn}>Request Loan</button>
      </div>
    </div>
  );
};

export default UserStats;
