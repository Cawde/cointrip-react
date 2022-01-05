import "../css/SearchBar.css";
import { useEffect, useState } from "react";
import { Pay } from "./index";
import { getUserIdLS } from "../auth";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  isActive: boolean;
  isVerified: boolean;
  hasBank: boolean;
  customerUrl: string;
  fundingSource: string;
}

export default function SearchBar({
  userId,
  firstName,
  lastName,
  email,
  fundingSource,
}: any) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recipientId, setRecipientId] = useState(0);
  const [recipientFirstName, setRecipientFirstName] = useState("");
  const [recipientLastName, setRecipientLastName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [openPayment, setOpenPayment] = useState(false);
  const [recipientBankUrl, setRecipientBankUrl] = useState("");

  function getAllUsers() {
    fetch("https://fierce-sea-46269.herokuapp.com/api/users/")
      .then((response) => response.json())
      .then((result) => {
        setUsers(result.users);
      })
      .catch(console.error);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="searchbar">
      <Pay
        openPayment={openPayment}
        setOpenPayment={setOpenPayment}
        userId={userId}
        firstName={firstName}
        lastName={lastName}
        email={email}
        fundingSource={fundingSource}
        recipientId={recipientId}
        recipientFirstName={recipientFirstName}
        recipientLastName={recipientLastName}
        recipientEmail={recipientEmail}
        recipientBankUrl={recipientBankUrl}
      />
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
                  (user.firstName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) &&
                    user.id !== Number(getUserIdLS())) ||
                  (user.lastName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) &&
                    user.id !== Number(getUserIdLS())) ||
                  (user.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) &&
                    user.id !== Number(getUserIdLS()))
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
                      setRecipientFirstName(user.firstName);
                      setRecipientLastName(user.lastName);
                      setRecipientEmail(user.email);
                      setRecipientBankUrl(user.fundingSource);
                      setOpenPayment(true);
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
