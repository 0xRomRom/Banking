import stl from "./UserStats.module.css";
import { get, getDatabase, ref, child } from "firebase/database";
import { useEffect, useState } from "react";
import TransferModal from "./TransferModal";

const db = getDatabase();

const UserStats = (props) => {
  const [balance, setBalance] = useState(0);
  const [savings, setSavings] = useState(0);
  const [borrowed, setBorrowed] = useState(0);
  const [showTransferModal, setShowTransferModal] = useState(false);

  useEffect(() => {
    const dbref = ref(db);

    get(child(dbref, "users/" + props.user.user.uid)).then((snapshot) => {
      const data = snapshot.val();
      setBalance(data.balance);
      setSavings(data.savings);
      setBorrowed(data.borrowed);
    });
  }, [props.user.user.uid]);

  const openTransferModal = () => {
    setShowTransferModal(() => !showTransferModal);
  };

  return (
    <>
      <div className={stl.container}>
        <div className={stl.balanceBlock}>
          <h2 className={stl.balanceTitle}>Balance</h2>
          <span className={`${stl.balanceAmount} ${stl.green}`}>
            $ {balance}
          </span>
        </div>
        <div className={stl.interestBlock}>
          <h2 className={stl.balanceTitle}>Interest</h2>
          <span className={`${stl.balanceAmount} ${stl.green}`}>2.3%</span>
        </div>
        <div className={stl.interestBlock}>
          <h2 className={stl.balanceTitle}>Savings</h2>
          <span className={stl.balanceAmount}>$ {savings}</span>
          <div className={stl.statsCtaBtnBox}>
            <button className={stl.depositBtn}>Deposit</button>
            <button className={stl.withdrawBtn}>Withdraw</button>
          </div>
        </div>
        <div className={stl.borrowedBlock}>
          <h2 className={stl.balanceTitle}>Borrowed</h2>
          <span className={stl.balanceAmount}>$ {borrowed}</span>
          <div className={stl.statsCtaBtnBox2}>
            <button className={stl.depositBtn}>Repay</button>
          </div>
        </div>
        <div className={stl.statsCtaBlock}>
          <button className={stl.sendBtn} onClick={openTransferModal}>
            Transfer
          </button>
          <button className={stl.requestLoanBtn}>Request Loan</button>
        </div>
      </div>
      {showTransferModal && (
        <TransferModal
          balance={balance}
          setBalance={setBalance}
          user={props.user}
          displayName={props.displayName}
          setShowTransferModal={setShowTransferModal}
          showTransferModal={showTransferModal}
        />
      )}
    </>
  );
};

export default UserStats;
