import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import stl from "./History.module.css";
import { useEffect } from "react";
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
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [sortOrder, setSortOrder] = useState({
    type: "asc",
    date: "asc",
    toFrom: "asc",
    amount: "asc",
  });

  // useEffect(() => {
  //   console.log(transactions);
  // }, [transactions]);

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
