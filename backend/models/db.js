const mongose = require("mongoose");

mongose
  .connect(process.env.DB_URL)
  .then((result) => {
    console.log("DB is Ready");
  })
  .catch((error) => {
    console.log(`error in DB ${error}`);
  });
