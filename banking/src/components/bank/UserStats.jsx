import stl from "./UserStats.module.css";

const UserStats = () => {
  return (
    <div className={stl.container}>
      <div className={stl.balanceBlock}>
        <h2 className={stl.balanceTitle}>Balance</h2>
        <span className={`${stl.balanceAmount} ${stl.green}`}>$1,299.40</span>
      </div>
      <div className={stl.interestBlock}>
        <h2 className={stl.balanceTitle}>Interest</h2>
        <span className={`${stl.balanceAmount} ${stl.green}`}>2.3%</span>
      </div>
      <div className={stl.interestBlock}>
        <h2 className={stl.balanceTitle}>Savings</h2>
        <span className={stl.balanceAmount}>$0</span>
        <div className={stl.statsCtaBtnBox}>
          <button className={stl.depositBtn}>Deposit</button>
          <button className={stl.withdrawBtn}>Withdraw</button>
        </div>
      </div>
      <div className={stl.borrowedBlock}>
        <h2 className={stl.balanceTitle}>Borrowed</h2>
        <span className={stl.balanceAmount}>$220</span>
        <div className={stl.statsCtaBtnBox2}>
          <button className={stl.depositBtn}>Repay</button>
        </div>
      </div>
      <div className={stl.statsCtaBlock}>
        <button className={stl.sendBtn}>Transfer</button>
        <button className={stl.requestLoanBtn}>Request Loan</button>
      </div>
    </div>
  );
};

export default UserStats;
