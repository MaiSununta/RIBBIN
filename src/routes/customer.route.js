const express = require('express');
const app = express.Router();
const controller = require('../controllers/customer.controller')

app.get("/", controller.getCustomers);

app.get("/:id", controller.getCustomerById);

app.get("/name/:name", controller.getCustomersByName);

app.post("/", controller.createCustomer);

app.put("/:id", controller.updateCustomer);

app.delete("/:id", controller.deleteCustomerById);

module.exports = app; 