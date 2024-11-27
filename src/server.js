import app from "./app.js";
import ENV from "./config/enviroment.config.js";
// DB connection
import mongoose from "./db/configDB.js";

const url = ENV.URL_BACKEND || `http://localhost:${ENV.PORT}`;

app.listen(port, () => {
  console.log(`Server running on ${url} 🚀`);
});
