const express = require("express");
const router = express.Router();
const shippingOper = require("../shippingDB/shippingOper");

router.get("/:DeliveryPersonID", async (req, res) => {
  const deliveryPersonID = req.params.DeliveryPersonID;

  try {
    const orders = await shippingOper.fetchOrdersByDeliveryPersonID(
      deliveryPersonID
    );
    console.log(orders.recordset);
    res.json({ orders: orders.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:orderid", async (req, res) => {
  const { orderid } = req.params;

  try {
    const orders = await shippingOper.deleteOrder(orderid);
    console.log(orders.recordset);
    res.json({ orders: orders.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
