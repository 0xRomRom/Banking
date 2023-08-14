import stl from "./TransferModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faList } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { get, getDatabase, ref, set, push } from "firebase/database";
import { ThreeCircles } from "react-loader-spinner";

const db = getDatabase();

const TransferModal = (props) => {
  const [pickingRecipient, setPickingRecipient] = useState(true);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [recipientUID, setRecipientUID] = useState("");
  const transferAmountRef = useRef(null);
  const [transferBtnDisabled, setTransferBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insuffucientBalance, setInsufficientBalance] = useState(false);

  useEffect(() => {
    const dbref = ref(db);

    get(dbref, "users/").then((snapshot) => {
      const data = snapshot.val();
      const converted = Object.entries(data.users);
      const filteredArray = converted.filter(
        ([key]) => key !== props.user.user.uid
      );
      setCurrentUsers(filteredArray);
    });
  }, [props.user.user.uid, props.balance]);

  const closeModal = () => {
    props.setShowTransferModal(() => !props.showTransferModal);
  };

  const transferFunds = async () => {
    const amount = +transferAmountRef.current.value;
    if (amount === 0 || isNaN(amount)) return;

    if (amount > +props.balance) {
      setInsufficientBalance(true);
      return;
    }
    setLoading(true);
    setTransferBtnDisabled(true);

    const dbref = ref(db);

    try {
      await Promise.all([
        get(dbref, "users/" + recipientUID).then((snapshot) => {
          let data = snapshot.val();
          const recipientsBalance = +data.users[recipientUID].balance;
          const newBalance = recipientsBalance + amount;
          data.users[recipientUID].balance = newBalance;

          const newDate = new Date();
          const tx = {
            type: "In",
            date: newDate,
            toFrom: props.displayName,
            amount: amount,
          };

          addTransaction(
            amount,
            "In",
            data.users[props.user.user.uid].displayName,
            data.users[recipientUID].displayName
          );
          const newData = data.users[recipientUID];
          return set(ref(db, "users/" + recipientUID), newData);
        }),
        get(dbref, "users/" + props.user.user.uid).then((snapshot) => {
          let data = snapshot.val();
          const spendersBalance = +data.users[props.user.user.uid].balance;
          const newBalance = spendersBalance - amount;
          data.users[props.user.user.uid].balance = newBalance;

          const newDate = new Date();
          const tx = {
            type: "Out",
            date: newDate,
            toFrom: data.users[props.user.user.uid].displayName,
            amount: amount,
          };
          addTransaction(
            amount,
            "Out",
            data.users[recipientUID].displayName,
            data.users[props.user.user.uid].displayName
          );
          props.setBalance(newBalance);
          const newData = data.users[props.user.user.uid];
          return set(ref(db, "users/" + props.user.user.uid), newData);
        }),
      ]);
    } catch (error) {
      console.error("Error transferring funds:", error);
    }
    props.setTransact((trans) => !trans);
    transferAmountRef.current.value = 0;

    setLoading(false);
    setTransferBtnDisabled(false);
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

  const setMaxBalance = () => {
    transferAmountRef.current.value = props.balance;
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
            <span className={stl.balanceAmount} onClick={setMaxBalance}>
              $ {props.balance}
            </span>
          </div>
          <div className={stl.fromToBox}>
            <span className={stl.from}>From</span>
            <h2 className={stl.spender}>{props.user.user?.displayName}</h2>
            <span className={stl.amount}>Amount</span>
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
              ref={transferAmountRef}
              onChange={(e) => {
                setInsufficientBalance(false);
                e.target.value = transferAmountRef.current.value;
              }}
            />
            <span className={stl.to}>To</span>
            {!pickingRecipient && (
              <>
                <span className={stl.pickedRecipient}>
                  {recipient} <br />{" "}
                  {
                    <span className={stl.bankAccountListed}>
                      {recipientUID}
                    </span>
                  }
                </span>
                <FontAwesomeIcon
                  icon={faList}
                  className={stl.listIcon}
                  onClick={() => setPickingRecipient(!pickingRecipient)}
                />

                <button
                  className={stl.transferBtn}
                  onClick={transferFunds}
                  disabled={transferBtnDisabled}
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
                    "Transfer"
                  )}
                </button>
              </>
            )}
            {pickingRecipient && (
              <div className={stl.recipientsBox}>
                {currentUsers.map((user) => {
                  return (
                    <div
                      className={stl.user}
                      key={Math.random()}
                      onClick={() => {
                        setPickingRecipient(() => !pickingRecipient);
                        setRecipient(user[1].displayName);
                        setRecipientUID(user[1].uid);
                      }}
                    >
                      {user[1].displayName}
                      <span className={stl.bankAccount}>{[user[1].uid]}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferModal;
