import app from "./app.js";
import ENV from "./config/enviroment.config.js";
// DB connection
import mongoose from "./db/configDB.js";

const port = ENV.PORT || 3000;

const url = `http://localhost:${port}` || "http://localhost:3000";

app.listen(port, () => {
  console.log(`Server running on ${url} 🚀`);
});
