import "../css/Pay.css";
import { Button, Container, Modal, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { getUserIdLS } from "../auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const moment = require("moment");
toast.configure();

export default function Pay({
  openPayment,
  setOpenPayment,
  userId,
  firstName,
  lastName,
  email,
  fundingSource,
  recipientId,
  recipientFirstName,
  recipientLastName,
  recipientEmail,
  recipientBankUrl,
}: any) {
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState(0);

  function createTransaction(event: React.FormEvent<HTMLFormElement>) {
    console.log("Expected json input:", {
      initiateId: userId,
      initiateName: `${firstName} ${lastName}`,
      initiateEmail: email,
      initiateBankUrl: fundingSource,
      amount: amount,
      recipientId: recipientId,
      recipientName: `${recipientFirstName} ${recipientLastName}`,
      recipientEmail: recipientEmail,
      recipientBankUrl: recipientBankUrl,
      date: moment(new Date()).format("YYYY-MM-DD"),
      notes: note,
    });
    event.preventDefault();
    fetch("https://fierce-sea-46269.herokuapp.com/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        initiateId: userId || getUserIdLS(),
        initiateName: `${firstName} ${lastName}`,
        initiateEmail: email,
        initiateBankUrl: fundingSource,
        amount: amount,
        recipientId: recipientId,
        recipientName: `${recipientFirstName} ${recipientLastName}`,
        recipientEmail: recipientEmail,
        recipientBankUrl: recipientBankUrl,
        date: moment(new Date()).format("YYYY-MM-DD"),
        notes: note,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 400) {
          toast.error("This user cannot send money", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.success(result.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(console.error);

    setOpenPayment(false);
  }
  return (
    <Modal open={openPayment} className="pay-modal-container">
      <div className="pay-form-container">
        <Container className="material-container">
          <form
            className="register-form"
            onSubmit={(event) => {
              createTransaction(event);
            }}
          >
            <TextField
              required
              className="input-field"
              id="standard-basic"
              label="Enter amount you wish to send"
              size="small"
              type="number"
              onChange={(event) => {
                setAmount(Number(event.target.value));
              }}
            />
            <TextField
              required
              className="input-field"
              id="standard-basic"
              label="Leave a note"
              size="small"
              onChange={(event) => {
                setNote(event.target.value);
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              id="loginBtn"
            >
              Pay
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              id="payBtn"
              onClick={() => setOpenPayment(false)}
            >
              Close
            </Button>
          </form>
        </Container>
      </div>
    </Modal>
  );
}
