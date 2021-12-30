import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, getUserId } from '../auth';

interface Transaction {
  id: number,
  initiateId: number;
  amount: number;
  recipientId: number;
  date: Date;
}

export default function Dashboard() {
  let navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  function getTransactionHistory() {
    fetch("https://fierce-sea-46269.herokuapp.com/api/transactions")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      
    })
    .catch(console.error);
  }
  useEffect(() => {
    if (!getToken()) {
      return navigate("/login");
    } 
    getTransactionHistory();
  },[])


  
  return(
    <div>
      <div>Here's all your transactions</div>
      {transactions ? transactions.filter((transaction:Transaction) => transaction.initiateId === Number(getUserId())).map((transaction: Transaction, index: number) => {
        return (
          <div className="transaction-results" key={index}>
            <ul>
              <li>id: {transaction.id}</li>
              <li>amount: {transaction.amount}</li>
              <li>recipientId: {transaction.recipientId}</li>
              <li>date: {transaction.date}</li>
            </ul>
          </div>
        )
      }) : "You have no transactiion history"}
    </div>
    

  )
}