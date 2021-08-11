const mongoose = require("mongoose");
const Room = require("../models/room");
const roomData = require("../data/rooms.json");

mongoose.connect("mongodb://localhost:27017/bookit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log("Rooms are deleted");
    await Room.insertMany(roomData);
    console.log("All rooms are added");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
