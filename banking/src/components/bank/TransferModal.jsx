import stl from "./TransferModal.module.css";

const TransferModal = (props) => {
  return (
    <div className={stl.container}>
      <div className={stl.modal}>
        <div className={stl.actionbox}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferModal;
