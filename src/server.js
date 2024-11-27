import app from "./app.js";
import ENV from "./config/enviroment.config.js";
// DB connection
import mongoose from "./db/configDB.js";

const url = ENV.URL_BACKEND || "http://localhost:3000";

app.listen(port, () => {
  console.log(`Server running on ${url} 🚀`);
});
