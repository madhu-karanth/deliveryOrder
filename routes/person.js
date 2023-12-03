const express = require('express');
const router = express.Router();
const shippingOper = require('../shippingDB/shippingOper');

router.delete('/:personId', async (req, res) => {
    const {personId} = req.params;

    try {
        const orders = await shippingOper.deletePerson(personId);
        console.log(orders.recordset);
        res.json({orders:orders.recordset});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
