import { mongoose } from "mongoose";

export function db() {
  mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      // useFindAndModify: false
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!, Make sure to setup in your ENV file");
      return;
    });
}
