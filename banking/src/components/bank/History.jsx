import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import stl from "./History.module.css";

const History = () => {
  const transactions = [
    {
      type: "In",
      date: "11/05/2023",
      toFrom: "James B",
      amount: 133.2,
    },
    {
      type: "Out",
      date: "15/06/2023",
      toFrom: "Bob Marley",
      amount: 419,
    },
    {
      type: "In",
      date: "11/05/2023",
      toFrom: "James B",
      amount: 133.2,
    },
    {
      type: "Out",
      date: "15/06/2023",
      toFrom: "Bob Marley",
      amount: 419,
    },
    {
      type: "In",
      date: "11/05/2023",
      toFrom: "James B",
      amount: 133.2,
    },
    {
      type: "Out",
      date: "15/06/2023",
      toFrom: "Bob Marley",
      amount: 419,
    },
    {
      type: "In",
      date: "11/05/2023",
      toFrom: "James B",
      amount: 133.2,
    },
    {
      type: "Out",
      date: "15/06/2023",
      toFrom: "Bob Marley",
      amount: 419,
    },
    {
      type: "In",
      date: "11/05/2023",
      toFrom: "James B",
      amount: 133.2,
    },
    {
      type: "Out",
      date: "15/06/2023",
      toFrom: "Bob Marley",
      amount: 419,
    },
    {
      type: "In",
      date: "11/05/2023",
      toFrom: "James B",
      amount: 133.2,
    },
    {
      type: "Out",
      date: "15/06/2023",
      toFrom: "Bob Marley",
      amount: 419,
    },
    {
      type: "In",
      date: "11/05/2023",
      toFrom: "James B",
      amount: 133.2,
    },
    {
      type: "Out",
      date: "15/06/2023",
      toFrom: "Bob Marley",
      amount: 419,
    },
    {
      type: "In",
      date: "11/05/2023",
      toFrom: "James B",
      amount: 133.2,
    },
    {
      type: "Out",
      date: "15/06/2023",
      toFrom: "Bob Marley",
      amount: 419,
    },
    {
      type: "In",
      date: "11/05/2023",
      toFrom: "James B",
      amount: 133.2,
    },
    {
      type: "Out",
      date: "15/06/2023",
      toFrom: "Bob Marley",
      amount: 419,
    },
  ];

  return (
    <div className={stl.container}>
      <div className={stl.filterRow}>
        <ul className={stl.filterUl}>
          <li className={stl.list}>
            Type
            <FontAwesomeIcon
              icon={faUpRightAndDownLeftFromCenter}
              className={stl.arrows}
            />
          </li>
          <li className={stl.list}>
            Date
            <FontAwesomeIcon
              icon={faUpRightAndDownLeftFromCenter}
              className={stl.arrows}
            />
          </li>
          <li className={stl.list}>
            To/From
            <FontAwesomeIcon
              icon={faUpRightAndDownLeftFromCenter}
              className={stl.arrows}
            />
          </li>
          <li className={stl.list}>
            Amount
            <FontAwesomeIcon
              icon={faUpRightAndDownLeftFromCenter}
              className={stl.arrows}
            />
          </li>
        </ul>
      </div>
      <div className={stl.listGrid}>
        {transactions.map((item) => {
          return (
            <div className={stl.gridRow} key={Math.random()}>
              <span className={`${stl.rowSpan} ${stl.centered}`}>
                {item.type}
              </span>
              <span className={stl.rowSpan}>{item.date}</span>
              <span className={stl.rowSpan}>{item.toFrom}</span>
              <span className={stl.rowSpan}>{item.amount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
