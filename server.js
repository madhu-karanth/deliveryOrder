const express = require("express");
const shippingOper = require("./shippingDB/shippingOper");
const cors = require("cors");
const ordersRouter = require("./routes/orders"); // Import the orders router
const personRouter = require("./routes/person"); // Import the orders router

const API_PORT = process.env.PORT || 5000;

const app = express();
let client;
let session;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/orders", ordersRouter); // Use the orders router
app.use("/api/person", personRouter);

app.post("/api/login", async (req, res) => {
  try {
    const { ID } = req.body;
    const result = await shippingOper.getDeliveryPersonDetails(ID);

    if (result.recordset.length === 0) {
      res.status(401).json({ message: "Login failed" });
    } else {
      res.json(result.recordset[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));
