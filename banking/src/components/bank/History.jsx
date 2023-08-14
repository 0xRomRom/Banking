import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import stl from "./History.module.css";
import { useState, useEffect } from "react";
import { get, getDatabase, ref, set, push } from "firebase/database";

const db = getDatabase();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const History = (props) => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  useEffect(() => {
    if (props.displayName) {
      const dbref = ref(db);
      get(dbref, "transactions/" + props.displayName + "/").then((snapshot) => {
        const data = snapshot.val();
        if (data.transactions[props.displayName]) {
          const converted = Object.entries(
            data.transactions[props.displayName]
          );
          setFilteredTransactions(converted);
        }
      });
    }
  }, [props.displayName, props.transacted]);

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
        {filteredTransactions.map((item) => {
          return (
            <div className={stl.gridRow} key={Math.random()}>
              <span className={`${stl.rowSpan} ${stl.centered}`}>
                {item[1].type}
              </span>
              <span className={stl.rowSpan}>{item[1].date.slice(0, 25)}</span>
              <span className={stl.rowSpan}>{item[1].toFrom}</span>
              <span className={stl.rowSpan}>{item[1].amount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
