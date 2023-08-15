import stl from "./DepositModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { get, getDatabase, ref, set } from "firebase/database";
import { ThreeCircles } from "react-loader-spinner";

const db = getDatabase();

const DepositModal = (props) => {
  const loanAmountRef = useRef(null);
  const [requestLoanBtnDisabled, setRequestLoanBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insuffucientBalance, setInsufficientBalance] = useState(false);

  const closeModal = () => {
    props.setShowDepositModal((item) => !item);
  };

  const deposit = async () => {
    const amount = +loanAmountRef.current.value;
    if (amount === 0 || isNaN(amount)) return;
    if (amount > +props.balance) {
      setInsufficientBalance(true);
      return;
    }

    setRequestLoanBtnDisabled(true);
    setLoading(true);

    const dbref = ref(db);

    await get(dbref, "users/" + props.user.user.uid).then((snapshot) => {
      let data = snapshot.val();
      const savingsBalance = +data.users[props.user.user.uid].savings;
      const newBalance = savingsBalance + amount;
      data.users[props.user.user.uid].savings = newBalance;

      const currentBalance = +data.users[props.user.user.uid].balance;
      const addedBalance = currentBalance - amount;
      data.users[props.user.user.uid].balance = addedBalance;

      addTransaction(
        amount,
        "Deposit",
        data.users[props.user.user.uid].displayName,
        "Bank"
      );
      props.setSavings((amounts) => (amounts += amount));
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
            <h2 className={stl.balance}>Balance</h2>
            <span className={stl.balanceAmount}>$ {props.balance}</span>
          </div>
          <span className={stl.amount}>Maximum Deposit</span>
          <span className={stl.maxAmount}>$ {props.balance}</span>
          <span className={stl.amount}>Deposit Amount</span>
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
            onClick={deposit}
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
              "Deposit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
