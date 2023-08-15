import stl from "./UserStats.module.css";
import { get, getDatabase, ref, child } from "firebase/database";
import { useEffect, useState } from "react";
import TransferModal from "./TransferModal";
import RequestLoanModal from "./RequestLoanModal";
import RepayDebtModal from "./RepayDebtModal";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import { useNavigate } from "react-router-dom";

const db = getDatabase();

const UserStats = (props) => {
  const [balance, setBalance] = useState(0);
  const [savings, setSavings] = useState(0);
  const [borrowed, setBorrowed] = useState(0);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showRequestLoanModal, setShowRequestLoanModal] = useState(false);
  const [showRepayDebtModal, setShowRepayDebtModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dbref = ref(db);
    if (!props.user.user) {
      navigate("/login");
      return;
    }

    get(child(dbref, "users/" + props.user.user.uid)).then((snapshot) => {
      const data = snapshot.val();
      setBalance(data.balance);
      setSavings(data.savings);
      setBorrowed(data.borrowed);
    });
  }, []);

  const openTransferModal = () => {
    setShowTransferModal(() => !showTransferModal);
  };

  const openRequestLoanModal = () => {
    setShowRequestLoanModal(() => !showRequestLoanModal);
  };

  const openRepayDebtModal = () => {
    setShowRepayDebtModal(() => !showRepayDebtModal);
  };

  const openDepositModal = () => {
    setShowDepositModal(() => !showDepositModal);
  };

  const openWithdrawModal = () => {
    setShowWithdrawModal(() => !showWithdrawModal);
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
            <button className={stl.depositBtn} onClick={openDepositModal}>
              Deposit
            </button>
            <button className={stl.withdrawBtn} onClick={openWithdrawModal}>
              Withdraw
            </button>
          </div>
        </div>
        <div className={stl.borrowedBlock}>
          <h2 className={stl.balanceTitle}>Debt</h2>
          <span className={stl.balanceAmount}>$ {borrowed}</span>
          <div className={stl.statsCtaBtnBox2}>
            <button className={stl.depositBtn} onClick={openRepayDebtModal}>
              Repay
            </button>
          </div>
        </div>
        <div className={stl.statsCtaBlock}>
          <button className={stl.sendBtn} onClick={openTransferModal}>
            Transfer
          </button>
          <button className={stl.requestLoanBtn} onClick={openRequestLoanModal}>
            Request Loan
          </button>
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
          setTransact={props.setTransact}
        />
      )}
      {showRequestLoanModal && (
        <RequestLoanModal
          showRequestLoanModal={setShowRequestLoanModal}
          borrowed={borrowed}
          setBorrowed={setBorrowed}
          setBalance={setBalance}
          user={props.user}
          setTransact={props.setTransact}
        />
      )}
      {showRepayDebtModal && (
        <RepayDebtModal
          borrowed={borrowed}
          setBorrowed={setBorrowed}
          balance={balance}
          setBalance={setBalance}
          setShowRepayDebtModal={setShowRepayDebtModal}
          user={props.user}
          setTransact={props.setTransact}
        />
      )}
      {showDepositModal && (
        <DepositModal
          borrowed={borrowed}
          setBorrowed={setBorrowed}
          balance={balance}
          setBalance={setBalance}
          setSavings={setSavings}
          setShowDepositModal={setShowDepositModal}
          user={props.user}
          setTransact={props.setTransact}
        />
      )}
      {showWithdrawModal && (
        <WithdrawModal
          borrowed={borrowed}
          setBorrowed={setBorrowed}
          balance={balance}
          setBalance={setBalance}
          setSavings={setSavings}
          setShowWithdrawModal={setShowWithdrawModal}
          user={props.user}
          setTransact={props.setTransact}
          savings={savings}
        />
      )}
    </>
  );
};

export default UserStats;
