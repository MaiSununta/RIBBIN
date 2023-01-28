const Room = require('../models/room.model.js');
exports.getRooms = (req, res)=>{
  Room.find()
        .exec((err, result) => {
            res.status(200).json({
                msg: "Search OK",
                data: result
            });
        });
};

exports.getRoomById = (req, res)=>{
  Room.findById(req.params.id)
  .exec((err, result) => {
      res.status(200).json({
          msg: "Search OK",
          data: result
      });
  });
}

exports.createRoom = async (req, res)=>{
  try {
    let room = new Room({
      floor: req.body.floor,
      room_number: req.body.room_number,
      price: req.body.price,
      status: req.body.status
    });
    let createdRoom = await room.save();
    res.status(200).json({
      msg: "App a room complete.",
      data: createdRoom
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error
    });
  }
}

exports.updateRoom = (req, res) => {
  let room = {  //ข้อมูลใหม่
    floor: req.body.floor,
      room_number: req.body.room_number,
      price: req.body.price,
      status: req.body.status
};
Room.findByIdAndUpdate(req.params.id, room)  //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
    .exec((err, result) => {
        // findById อีกครั้งเพื่อเอา data ใหม่
        Room.findById(req.params.id)
            .exec((err, result) => {
                res.status(200).json({
                    msg: "OK",
                    data: result
                });
            });
    });
}

exports.appRoomReview = async (req, res) =>{
  let reviewData = {
    $push: {
        reviews: {
            star: req.body.star,
            comment: req.body.comment
        }
    }
};
Room.findByIdAndUpdate(req.params.id, reviewData)  //ระบุทั้ง id ที่ต้องการแก้ และข้อมูลใหม่
    .exec((err, result) => {
        // findById อีกครั้งเพื่อเอา data ใหม่
        Room.findById(req.params.id)
            .exec((err, result) => {
                res.status(200).json({
                    msg: "OK",
                    data: result
                });
            });
    });
}

exports.deleteRoomById = async (req, res) =>{
  Room.findByIdAndDelete(req.params.id)
        .exec((err, result) => {
            res.status(200).json({
                msg: "Delete OK"
            });
        });
}

exports.getRoomsByRoomNumber = async (req, res) =>{
  Room.find({
    room_number: new RegExp(req.params.room_number)
}) // { room_number: /xxxx/}
.exec((err, result) => {
    res.status(200).json({
        msg: "Search OK",
        data: result
    });
});
}

exports.getRoomsByPirce = async (req, res) =>{
  Room.find({
    price: new RegExp(req.params.price)
}) // { price: /xxxx/}
.exec((err, result) => { 
    res.status(200).json({
        msg: "Search OK",
        data: result 
    });
});
}