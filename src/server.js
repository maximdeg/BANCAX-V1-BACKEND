import app from "./app.js";
import ENV from "./config/enviroment.config.js";
// DB connection
import mongoose from "./db/configDB.js";

const port = ENV.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port} 🚀`);
});
