import stl from "./RepayDebtModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faList } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { get, getDatabase, ref, set, push } from "firebase/database";
import { ThreeCircles } from "react-loader-spinner";

const db = getDatabase();

const RepayDebtModal = (props) => {
  const loanAmountRef = useRef(null);
  const [requestLoanBtnDisabled, setRequestLoanBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insuffucientBalance, setInsufficientBalance] = useState(false);

  const closeModal = () => {
    props.setShowRepayDebtModal((modal) => !modal);
  };

  const repayDebt = async () => {
    const amount = +loanAmountRef.current.value;
    if (amount === 0 || isNaN(amount)) return;
    if (amount > props.balance) {
      setInsufficientBalance(true);
      return;
    }

    setRequestLoanBtnDisabled(true);
    setLoading(true);

    const dbref = ref(db);

    await get(dbref, "users/" + props.user.user.uid).then((snapshot) => {
      let data = snapshot.val();
      const borrowedBalance = +data.users[props.user.user.uid].borrowed;
      const newBalance = borrowedBalance - amount;
      data.users[props.user.user.uid].borrowed = newBalance;

      const currentBalance = +data.users[props.user.user.uid].balance;
      const addedBalance = currentBalance - amount;
      data.users[props.user.user.uid].balance = addedBalance;

      addTransaction(
        amount,
        "Loan (out)",
        data.users[props.user.user.uid].displayName,
        "Bank"
      );

      props.setBorrowed(newBalance);
      props.setBalance(addedBalance);
      const newData = data.users[props.user.user.uid];
      return set(ref(db, "users/" + props.user.user.uid), newData);
    });
    props.setTransact((trans) => !trans);
    loanAmountRef.current.value = 0;
    setRequestLoanBtnDisabled(false);
    setLoading(false);
  };

  const addTransaction = async (amount, type, to, from) => {
    const timestamp = new Date();

    const transactionData = {
      amount: amount,
      date: timestamp.toString(),
      toFrom: to,
      type: type,
    };
    await set(
      ref(
        db,
        "transactions/" +
          from +
          "/" +
          (Math.random() * 100000000).toFixed(0).toString()
      ),
      transactionData
    );
  };

  return (
    <div className={stl.container}>
      <div className={stl.modal}>
        <div className={stl.actionbox}>
          <FontAwesomeIcon
            icon={faXmark}
            className={stl.close}
            onClick={closeModal}
          />
          <div className={stl.balanceBox}>
            <h2 className={stl.balance}>Debt</h2>
            <span className={stl.balanceAmount}>$ {props.borrowed}</span>
          </div>
          <span className={stl.amount}>Maximum Repayment</span>
          <span className={stl.maxAmount}>
            $ {props.borrowed > props.balance ? props.balance : props.borrowed}
          </span>
          <span className={stl.amount}>Repayment Amount</span>
          <label
            className={`${stl.dollar} ${
              insuffucientBalance ? stl.dollarRed : ""
            }`}
          >
            $
          </label>
          <input
            type="number"
            className={`${stl.inputBox} ${
              insuffucientBalance ? stl.inputBoxRed : ""
            }`}
            placeholder="0.00"
            ref={loanAmountRef}
            onChange={(e) => {
              e.target.value = loanAmountRef.current.value;
              setInsufficientBalance(false);
            }}
          />

          <button
            className={stl.requestBtn}
            onClick={repayDebt}
            disabled={requestLoanBtnDisabled}
          >
            {loading ? (
              <ThreeCircles
                height="25"
                width="25"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
              />
            ) : (
              "Repay Debt"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepayDebtModal;
