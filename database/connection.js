const mongoose = require("mongoose");

async function connectDatabase(url) {
  return await mongoose
    .connect(url)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(`Error : ${err}`));
}

module.exports = {connectDatabase}
