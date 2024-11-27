import mongoose from "mongoose";
import ENV from "../config/enviroment.config.js";

const db = ENV.DB_URL.replace("<USERNAME>", ENV.DB_USER)
  .replace("<PASSWORD>", ENV.DB_PASS)
  .replace("<DATABASE>", ENV.DB_NAME);

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to the MongoDB database 🦾");
  })
  .catch(error => {
    console.error("ERROR 💥 connecting to database: " + error.message);
  });

export default mongoose;
