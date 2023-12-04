const config = require("./shippingConfig");
const sql = require("mssql");
const { v4: uuidv4 } = require("uuid");

const getDeliveryPersonDetails = async (ID) => {
  try {
    let pool = await sql.connect(config);
    let deliveryPerson = await pool.request().query(`
            SELECT * FROM DeliveryPersonDetails WHERE DeliveryPersonID = '${ID}'
        `);
    return deliveryPerson;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const newDeliveryPerson = async (DeliveryPersonDetails) => {
  try {
    let pool = await sql.connect(config);
    let deliveryPerson = await pool.request().query(`
                INSERT INTO DeliveryPersonDetails 
                VALUES (
                    '${DeliveryPersonDetails.DeliveryPersonID}',
                    '${DeliveryPersonDetails.FirstName}',
                    '${DeliveryPersonDetails.LastName}',
                    '${DeliveryPersonDetails.ContactNumber}',
                    '${DeliveryPersonDetails.Email}',
                    '${DeliveryPersonDetails.VehicleID}'
                )
            `);
    return deliveryPerson;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchOrdersByDeliveryPersonID = async (deliveryPersonID) => {
  try {
    let pool = await sql.connect(config);
    let orders = await pool.request().query(`
            SELECT ord.OrderID,ord.OrderStatus,ord.DeliveryDate,ord.EstimatedDeliveryTime,ord.ActualDeliveryTime,pt.PName,pt.PAddress,pt.ContactNumber FROM Orders ord JOIN PickUpPoints pt ON pt.PickUpPointID = ord.PickUpPointID WHERE DeliveryPersonID = '${deliveryPersonID}'
        `);
    return orders;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteOrder = async (orderid) => {
  try {
    let pool = await sql.connect(config);
    let orders = await pool.request().query(`
            Delete from Orders WHERE OrderID  = '${orderid}'
        `);
    return orders;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deletePerson = async (personId) => {
  try {
    let pool = await sql.connect(config);
    let orders = await pool.request().query(`
            Delete from DeliveryPersonDetails WHERE DeliveryPersonID  = '${personId}'
        `);
    return orders;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updatePerson = async ({
  DeliveryPersonID,
  FirstName,
  LastName,
  ContactNumber,
  Email,
  VehicleID,
}) => {
  try {
    let pool = await sql.connect(config);
    let orders = await pool
      .request()
      .query(
        `Update DeliveryPersonDetails set FirstName='${FirstName}', LastName= '${LastName}', ContactNumber= '${ContactNumber}', Email= '${Email}', VehicleID= '${VehicleID}'  WHERE DeliveryPersonID  = '${DeliveryPersonID}'`
      );
    return orders;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createPerson = async ({
  DeliveryPersonID,
  PName,
  PAddress,
  ContactNumber,
  OrderStatus,
  DeliveryDate,
  EstimatedDeliveryTime,
}) => {
  try {
    console.log(
      DeliveryPersonID,
      PName,
      PAddress,
      ContactNumber,
      OrderStatus,
      DeliveryDate,
      EstimatedDeliveryTime
    );
    let pool = await sql.connect(config);
    const uniqueId = uuidv4();
    const orderuniqui = uuidv4();
    await pool
      .request()
      .query(
        `insert into PickUpPoints values('${uniqueId}','${PName}','${PAddress}','${ContactNumber}')`
      );

    const dateObject = new Date(EstimatedDeliveryTime);

    const hours = dateObject.getHours().toString().padStart(2, "0");
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");
    const seconds = dateObject.getSeconds().toString().padStart(2, "0");

    const timeString = `${hours}:${minutes}:${seconds}`;

    let orders = await pool.request()
      .query(`insert into Orders values('${orderuniqui}','${DeliveryPersonID}','${uniqueId}','DA118','${OrderStatus}','${DeliveryDate}','${timeString}','21:00:00')
      `);
    return orders;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getDeliveryPersonDetails,
  newDeliveryPerson,
  fetchOrdersByDeliveryPersonID,
  deleteOrder,
  deletePerson,
  updatePerson,
  createPerson,
};
