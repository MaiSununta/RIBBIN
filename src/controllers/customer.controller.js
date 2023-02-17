const Customer = require('../models/customer.model.js');
exports.getCustomers = (req, res)=>{
  Customer.find()  
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

exports.getCustomerById = (req, res)=>{
  Customer.findById(req.params.id)
  .exec((err, result) => {
      res.status(200).json({
          msg: "Search OK",
          data: result
      });
  });
}

exports.getCustomersByName = async (req, res) =>{
    Customer.find({
      Name: new RegExp(req.params.name)
  }) // { name: /xxxx/}
  .exec((err, result) => {
      res.status(200).json({
          msg: "Search OK",
          data: result
      });
  });
  }

exports.createCustomer = async (req, res)=>{
  try {
    let customer = new Customer({
      name: req.body.name,
      number_phone: req.body.number_phone,
      contract: req.body.contract,
      room_number: req.body.room_number
    });
    let createdCustomer = await customer.save();
    res.status(200).json({
      msg: "App a customer complete.",
      data: createdCustomer
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error
    });
  }
}

exports.updateCustomer = (req, res) => {
  let customer = {  //ข้อมูลใหม่
    name: req.body.name,
    number_phone: req.body.number_phone,
    contract: req.body.contract,
    room_number: req.body.room_number
};
Customer.findByIdAndUpdate(req.params.id, customer)  //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
    .exec((err, result) => {
        // findById อีกครั้งเพื่อเอา data ใหม่
        Customer.findById(req.params.id)
            .exec((err, result) => {
                res.status(200).json({
                    msg: "OK",
                    data: result
                });
            });
    });
}

exports.deleteCustomerById = async (req, res) =>{
  Customer.findByIdAndDelete(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: "Delete OK"
            });
        });
}
