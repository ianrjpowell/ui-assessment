import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import data from "./data";

function App() {
  const [loadedData, setloadedData] = useState({});
  const [userRewards, setCalcRewards] = useState({});
  const [userTransactions, setUserTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    setloadedData({ ...data });
    setUsers([...Object.keys(data)]);
  }, []);

  const userSelect = (value) => {
    setCurrentUser(value);
    let userData = loadedData[value];

    let monthT = {
      1: {
        amounts: [],
        rewards: 0,
      },
      2: {
        amounts: [],
        rewards: 0,
      },
      3: {
        amounts: [],
        rewards: 0,
      },
    };
    for (let i = 0; i < userData.length; i++) {
      let month = new Date(userData[i]["date"]);
      if (
        month.getMonth() + 1 === 1 ||
        month.getMonth() + 1 === 2 ||
        month.getMonth() + 1 === 3
      ) {
        monthT[month.getMonth() + 1]["amounts"].push(userData[i]["amount"]);
      }
    }
    for (let key in monthT) {
      let total_month_rewards = 0;
      for (let i = 0; i < monthT[key]["amounts"].length; i++) {
        let price = monthT[key]["amounts"][i];

        total_month_rewards = total_month_rewards + calRew(price);
      }
      monthT[key]["rewards"] = total_month_rewards;
    }
    setCalcRewards({ ...monthT });
    setUserTransactions([...userData]);
  };

  return (
    //username 8character
    <div
      style={{
        marginTop: "20px",
        marginBottom: "50px",
        fontSize: "20px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>User Rewards Dashboard</h2>
      <div className="select-style">
        <select
          onChange={(e) => userSelect(e.target.value)}
          value={currentUser}
        >
          <option value="" disabled>
            Select User
          </option>
          {users.map((item, index) => {
            return (
              <option key={index} value={item}>
                {" "}
                {item.toUpperCase()}{" "}
              </option>
            );
          })}
        </select>
      </div>
      {Object.keys(userRewards).length > 0 && (
        <Fragment>
          <table className="customers">
            <thead>
              <tr>
                <th>Month</th>
                <th>Rewards</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First Month</td>
                <td>{userRewards[1]["rewards"]}</td>
              </tr>
              <tr>
                <td>Second Month</td>
                <td>{userRewards[2]["rewards"]}</td>
              </tr>
              <tr>
                <td>Third Month</td>
                <td>{userRewards[3]["rewards"]}</td>
              </tr>
              <tr>
                <td>Total Reward</td>
                <td>
                  {userRewards[1]["rewards"] +
                    userRewards[2]["rewards"] +
                    userRewards[3]["rewards"]}
                </td>
              </tr>
            </tbody>
          </table>
          <h4>User Transactions</h4>
          {userTransactions.length > 0 ? (
            <table className="customers">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Rewards</th>
                </tr>
              </thead>
              <tbody>
                {userTransactions.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item["date"]}</td>
                      <td>{item["amount"]}</td>
                      <td>{calRew(item["amount"])}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>No Transactions Found</div>
          )}
        </Fragment>
      )}
    </div>
  );
}

export default App;

function calRew(price) {
  let rewards = 0;
  if (price > 100) {
    rewards = (price - 100) * 2;
  }
  if (price > 50) {
    rewards = rewards + (price - 50);
  }
  return rewards;
}
