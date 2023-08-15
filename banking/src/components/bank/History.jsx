import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpRightAndDownLeftFromCenter,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import stl from "./History.module.css";
import { useState, useEffect, useCallback } from "react";
import { get, getDatabase, ref } from "firebase/database";

const db = getDatabase();

const History = (props) => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const fetchTransactionList = useCallback(async () => {
    if (!props.displayName) return;
    if (props.displayName) {
      setFilteredTransactions([]);
      const dbref = ref(db);

      get(dbref, "transactions/").then((snapshot) => {
        const data = snapshot.val();
        if (!data.transactions) return;
        let tempArray = [];

        for (const key in data.transactions["Bank"]) {
          if (data.transactions["Bank"][key].toFrom === props.displayName) {
            tempArray.push([key, data.transactions["Bank"][key]]);
          }
        }

        for (const key in data.transactions[props.displayName]) {
          tempArray.push([key, data.transactions[props.displayName][key]]);
        }
        setFilteredTransactions((prev) => [...prev, ...tempArray]);
      });
    }
  }, [props.displayName]); // Make sure to include props.displayName as a dependency

  useEffect(() => {
    fetchTransactionList();
  }, [props.transact, props.displayName, fetchTransactionList]);

  // Rest of your component code remains the same...

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
        return a[1][type].localeCompare(b[1][type]);
      } else {
        return b[1][type].localeCompare(a[1][type]);
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
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
      if (sortOrder[type] === "asc") {
        if (a[1].amount < b[1].amount) {
          return 1;
        } else if (a[1].amount > b[1].amount) {
          return -1;
        }
        return 0;
      }
      if (sortOrder[type] === "desc") {
        if (a[1].amount < b[1].amount) {
          return -1;
        } else if (a[1].amount > b[1].amount) {
          return 1;
        }
        return 0;
      }
      return 0;
    });
    setFilteredTransactions(sortedTransactions);
    setSortOrder({
      ...sortOrder,
      [type]: sortOrder[type] === "asc" ? "desc" : "asc",
    });
  };

  //Filter To/From
  const filterToFrom = (type) => {
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
      if (sortOrder[type] === "asc") {
        if (a[1].toFrom < b[1].toFrom) {
          return 1;
        } else if (a[1].toFrom > b[1].toFrom) {
          return -1;
        }
        return 0;
      }
      if (sortOrder[type] === "desc") {
        if (a[1].toFrom < b[1].toFrom) {
          return -1;
        } else if (a[1].toFrom > b[1].toFrom) {
          return 1;
        }
        return 0;
      }
      return 0;
    });
    setFilteredTransactions(sortedTransactions);
    setSortOrder({
      ...sortOrder,
      [type]: sortOrder[type] === "asc" ? "desc" : "asc",
    });
  };

  //Filter by date
  const filterByDate = (type) => {
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
      const dateA = new Date(a[1].date);
      const dateB = new Date(b[1].date);

      if (sortOrder[type] === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
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
          <li className={stl.list} onClick={() => filterByDate("date")}>
            Date
            <FontAwesomeIcon
              icon={faUpRightAndDownLeftFromCenter}
              className={stl.arrows}
            />
          </li>
          <li className={stl.list} onClick={() => filterToFrom("toFrom")}>
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
        {filteredTransactions.length === 0 ? (
          <div className={stl.noTransactions}>
            No Transactions <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        ) : (
          filteredTransactions.map((item) => {
            return (
              <div className={stl.gridRow} key={Math.random()}>
                <span className={`${stl.rowSpan} ${stl.centered}`}>
                  {item[1].type}
                </span>
                <span className={`${stl.rowSpan} ${stl.wider}`}>{item[1].date.slice(0, 25)}</span>
                <span className={stl.rowSpan}>
                  {item[1].type === "Loan (in)" ||
                  item[1].type === "Loan (out)" ||
                  item[1].type === "Deposit"
                    ? "Bank"
                    : item[1].toFrom}
                </span>
                <span className={stl.rowSpan}>{item[1].amount}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default History;
