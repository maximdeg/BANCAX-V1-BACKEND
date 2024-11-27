import app from "./app.js";
import ENV from "./config/enviroment.config.js";
// DB connection
import mongoose from "./db/configDB.js";

const url = `http://localhost:${ENV.PORT}` || "http://localhost:3000";

app.listen(ENV.PORT, () => {
  console.log(`Server running on ${url} 🚀`);
});
