import "../css/SearchBar.css";
import React, { useEffect, useState } from 'react';
import { Search } from "@material-ui/icons";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export default function SearchBar({setOpenStripe, setRecipientId, setRecipientName, setRecipientEmail}: any) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function getAllUsers() {
    fetch("http://localhost:5000/api/users/")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUsers(result.users);
      })
      .catch(console.error);
  }

  useEffect(() => {
    getAllUsers();
  },[]);

  return (
    <div className="searchbar">
      <div className="input">
        <input
          type="text"
          placeholder="search for a person to pay..."
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className="results">
        {users
          ? users
              .filter((user: User) => {
                if (searchTerm === "") {
                  return;
                } else if (
                  user.firstName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  user.lastName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return user;
                }
              })
              .map((user: User, index) => {
                return (
                  <div
                    key={index}
                    className="results-item"
                    onClick={() => {
                      setRecipientId(user.id);
                      setRecipientName(user.firstName);
                      setRecipientEmail(user.email);
                      setOpenStripe(true);
                    }}
                  >
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                    <p>{user.email}</p>
                  </div>
                );
              })
          : "No users found"}
      </div>
    </div>
  );

}
