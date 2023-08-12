import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import stl from "./History.module.css";
import { useState } from "react";

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
      amount: 219,
    },
    {
      type: "In",
      date: "11/05/2023",
      toFrom: "James B",
      amount: 513.2,
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
      amount: 15,
    },
    {
      type: "Out",
      date: "15/06/2023",
      toFrom: "Bob Marley",
      amount: 99,
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
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [sortOrder, setSortOrder] = useState({
    type: "asc",
    date: "asc",
    toFrom: "asc",
    amount: "asc",
  });

  //Filters the type
  const filterByType = (type) => {
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
      if (sortOrder[type] === "asc") {
        return a[type].localeCompare(b[type]);
      } else {
        return b[type].localeCompare(a[type]);
      }
    });

    setFilteredTransactions(sortedTransactions);
    setSortOrder({
      ...sortOrder,
      [type]: sortOrder[type] === "asc" ? "desc" : "asc",
    });
  };

  //Filter by amount
  const filterAmount = (type) => {
    console.log("Toggling");
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
      console.log(a.amount);
      console.log(b);
      if (sortOrder[type] === "asc") {
        if (a.amount < b.amount) {
          return 1;
        } else if (a.amount > b.amount) {
          return -1;
        }
        return 0;
      }
      if (sortOrder[type] === "desc") {
        if (a.amount < b.amount) {
          return -1;
        } else if (a.amount > b.amount) {
          return 1;
        }
        return 0;
      }
    });
    setFilteredTransactions(sortedTransactions);
    setSortOrder({
      ...sortOrder,
      [type]: sortOrder[type] === "asc" ? "desc" : "asc",
    });
  };

  return (
    <div className={stl.container}>
      <div className={stl.filterRow}>
        <ul className={stl.filterUl}>
          <li className={stl.list} onClick={() => filterByType("type")}>
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
          <li className={stl.list} onClick={() => filterAmount("amount")}>
            Amount
            <FontAwesomeIcon
              icon={faUpRightAndDownLeftFromCenter}
              className={stl.arrows}
            />
          </li>
        </ul>
      </div>
      <div className={stl.listGrid}>
        {filteredTransactions.map((item) => {
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

        {/* {transactions.map((item) => {
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
        })} */}
      </div>
    </div>
  );
};

export default History;
