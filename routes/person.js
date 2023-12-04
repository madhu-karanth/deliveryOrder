const express = require("express");
const router = express.Router();
const shippingOper = require("../shippingDB/shippingOper");

router.delete("/:personId", async (req, res) => {
  const { personId } = req.params;

  try {
    await shippingOper.deletePerson(personId);
    res.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    await shippingOper.updatePerson(req.body);
    res.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/create", async (req, res) => {
  try {
    await shippingOper.createPerson(req.body);
    res.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
