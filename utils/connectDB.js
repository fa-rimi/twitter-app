const mongoose = require("mongoose");

module.exports = function connectDB() {
  // connecting to mongoDB
  mongoose.connect(process.env.MONGO_URI);

  // check for connection
  const db = mongoose.connection;
  // on is like an event listener
  db.on("error", (e) => console.log(e)); // on the event of an error
  db.on("open", () => console.log("Connected to MongoDB")); // on the event when its open
  db.on("close", () => console.log("MongoDB disconnected")); // on the event when its closed

  //   setTimeout(() => {
  //     db.close();
  //   }, 5000);
};
