import React, { useState, useContext } from "react";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";

import { AuthContext } from "../context/AuthContext";
import UserService from "../services/UserService";

import Message from "./Message";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "550px",
    maxWidth: "600px",
    margin: "1rem auto",
    padding: "1rem 0",
    alignItems: "center",
    background: "secondary",
    borderRadius: "0.6rem",
  },
  title: {
    marginBottom: "1rem",
    marginTop: "1.5rem",
  },
  formContainer: {
    width: "400px",
  },
  label: {
    marginBottom: "0.5rem",
  },
  cardNumber: {
    padding: "1.1rem",
    border: "1px solid #dee2e6",
    borderRadius: "10px",
  },
  flexBox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2rem",
  },
  cardExpDate: {
    padding: "1.1rem",
    border: "1px solid #dee2e6",
    borderRadius: "10px",
    width: "200px",
  },
  cardCvc: {
    padding: "1.1rem",
    border: "1px solid #dee2e6",
    borderRadius: "10px",
    width: "100px",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
  },

  payBtn: {
    padding: "0.7rem 4rem",
    borderRadius: "2rem",
    background: "turquoise",
    textTransform: "capitalize",
    fontSize: "1rem",
    margin: "2rem 0",
    "&:hover": {
      backgroundColor: "#43dd9a",
      color: "#6E3ADB",
    },
  },
}));

const stripePromise = loadStripe(
  "pk_test_51FvctMEpOvdYM3XDNw0N95RyCccgWE5gzWF5LAKDYj1hOYUnp5NQmDfh8AHYwRtTvqPDoo9yccDJt5CnimroHCui00ugrYFDSQ"
);

const CheckoutForm = () => {
  const classes = useStyles();

  // context
  const { topupAmount, setUser } = useContext(AuthContext);

  // state
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // stripe
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // process card element
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    if (!error) {
      const { id } = paymentMethod;

      const amount = topupAmount * 3 * 100;

      const payload = { id, amount };

      setLoading(true);

      try {
        // send card info to backend
        const res = await fetch("/api/users/charge", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
        if (res.status !== 200) {
          return { errorMsg: { msg: "Some errors" } };
        } else {
          // topup service
          UserService.topup(topupAmount).then((data) => {
            setUser(data);
            setLoading(false);
            setMessage("Top Up Successfully");
          });
          return res.json({ msg: "Success" });
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  // style for card element
  const options = {
    style: {
      base: {
        color: "#6E3ADB",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div>
      <Paper elevation={0} className={classes.container}>
        <Typography variant='h3' className={classes.title}>
          Checkout
        </Typography>
        <form onSubmit={handleSubmit} className={classes.formContainer}>
          <Typography variant='h6' className={classes.label}>
            Card number
          </Typography>
          <CardNumberElement options={options} className={classes.cardNumber} />
          <Box component='div' className={classes.flexBox}>
            <Box component='div'>
              <Typography variant='h6' className={classes.label}>
                Expiry date
              </Typography>
              <CardExpiryElement
                options={options}
                className={classes.cardExpDate}
              />
            </Box>
            <Box component='div'>
              <Typography variant='h6' className={classes.label}>
                CVC
              </Typography>
              <CardCvcElement options={options} className={classes.cardCvc} />
            </Box>
          </Box>
          <Box component='div' className={classes.btnContainer}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disableElevation
              className={classes.payBtn}
              disabled={!stripe}
            >
              {loading ? (
                <CircularProgress size={30} />
              ) : (
                `Pay $${topupAmount * 3}`
              )}
            </Button>
          </Box>
        </form>
        {message && <Message open={true} type='success' message={message} />}
      </Paper>
    </div>
  );
};

const StripeInput = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeInput;
