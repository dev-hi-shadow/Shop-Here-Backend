const mongoose = require("mongoose");

const Connect_MongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Couldn't connect to Mongo due to : ", error.message);
  }
};
module.exports = Connect_MongoDB;
