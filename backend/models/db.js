const mongose = require("mongoose");

mongose
  .connect("mongodb://localhost:27017//Project#4")
  .then((result) => {
    console.log("DB is Ready");
  })
  .catch((error) => {
    console.log(`error in DB ${error}`);
  });
