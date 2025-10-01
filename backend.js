const express = require("express");
const mysql = require("mysql2");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "event_db"
});

// Razorpay instance
const razorpay = new Razorpay({
  key_id: "RAZORPAY_KEY_ID",
  key_secret: "RAZORPAY_KEY_SECRET"
});

// API: Create Order
app.post("/create-order", (req, res) => {
  const options = { amount: 50000, currency: "INR" }; // 500 INR
  razorpay.orders.create(options, (err, order) => {
    res.json(order);
  });
});

// API: Verify Payment & Save to DB
app.post("/verify-payment", (req, res) => {
  const { rollno, name, branch, event, razorpay_payment_id } = req.body;

  db.query("INSERT INTO payments (rollno, name, branch, event, payment_id) VALUES (?, ?, ?, ?, ?)",
    [rollno, name, branch, event, razorpay_payment_id],
    (err) => {
      if (err) throw err;
      res.json({ status: "success" });
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
