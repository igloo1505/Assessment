const mongoose = require("mongoose");
// const config = require("config");
const dbPass = process.env.DB_PASSWORD
const uri = `mongodb+srv://Aiglinski:${dbPass}@assessment.1yogf.mongodb.net/<dbname>?retryWrites=true&w=majority`

const connectDB = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: false,
      autoIndex: false,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Recipe app connected to Database"));
};

module.exports = connectDB;
