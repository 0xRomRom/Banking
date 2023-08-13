import stl from "./TransferModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faList } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { get, getDatabase, ref, child } from "firebase/database";

const db = getDatabase();

const TransferModal = (props) => {
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
  }, []);

  const [pickingRecipient, setPickingRecipient] = useState(true);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [recipientUID, setRecipientUID] = useState("");

  const closeModal = () => {
    props.setShowTransferModal(() => !props.showTransferModal);
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
          <div className={stl.fromToBox}>
            <span className={stl.from}>From</span>
            <h2 className={stl.spender}>{props.user.user?.displayName}</h2>
            <span className={stl.amount}>Amount</span>
            <label className={stl.dollar}>$</label>
            <input type="number" className={stl.inputBox} placeholder="0.00" />
            <span className={stl.to}>To</span>
            {!pickingRecipient && (
              <>
                <span className={stl.pickedRecipient}>
                  {recipient} <br /> {recipientUID}
                </span>
                <FontAwesomeIcon
                  icon={faList}
                  className={stl.listIcon}
                  onClick={() => setPickingRecipient(!pickingRecipient)}
                />
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
