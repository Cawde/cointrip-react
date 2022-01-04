import { Button, Container, TextField } from "@material-ui/core";
import React, { useState } from "react";

export default function CardPayout({firstName, lastName, email}: any) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  async function handleSubmit(event: any) {
    event?.preventDefault();

    fetch("http://localhost:5000/api/transactions/payout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentMethodType: "card",
        currency: "usd",
        name: `${firstName} ${lastName}`,
        email,
        cardNumber,
        cardMonth,
        cardYear,
        cardCVC,
        amount: 5
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);

  }
  return (
    <>
      <h1>Card</h1>
      <Container>
        <form
          className="payout-form"
          autoComplete="off"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <TextField
            required
            className="input-field"
            id="standard-basic"
            label="Card number"
            size="small"
            type="number"
            name="ccnumber"
            inputMode="numeric"
            autoComplete="cc-number"
            inputProps={{ maxLength: 16, minLength: 16 }}
            placeholder="xxxx xxxx xxxx xxxx"
            onChange={(event) => {
              setCardNumber(event.target.value);
            }}
          />
          <TextField
            required
            className="input-field"
            id="standard-basic"
            label="Expiration Month"
            size="small"
            type="number"
            placeholder="MM"
            inputProps={{ maxLength: 2 }}
            onChange={(event) => {
              setCardMonth(event.target.value);
            }}
          />
          <TextField
            required
            className="input-field"
            id="standard-basic"
            label="Expiration Year"
            size="small"
            type="number"
            placeholder="YYYY"
            inputProps={{ maxLength: 4 }}
            onChange={(event) => {
              setCardYear(event.target.value);
            }}
          />
          <TextField
            required
            className="input-field"
            id="standard-basic"
            name="cvc"
            label="CVC"
            size="small"
            type="number"
            inputProps={{ maxLength: 3 }}
            onChange={(event) => {
              setCardCVC(event.target.value);
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            id="loginBtn"
          >
            Submit Payout to card
          </Button>
        </form>
      </Container>
    </>
  );
}
