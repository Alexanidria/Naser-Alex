const express = require("express");
const cors = require("cors");
const path = require('path')

const { connected } = require("./connectToDB");
require("dotenv").config();


const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(
  // {origin: "http://localhost:3000",
  // optionsSuccessStatus: 200 }
));
app.use(express.json());

// connect to data base
const connect = async () => {
  const co = await connected();
  if (co) {
    console.log("ok");
  } else {
    console.log("no");
  }
  return co;
};
connect();

app.use('/student', require('./routers/student'))



//  items Middelware
app.use('/items/car', require('./routers/items/car-router'))
app.use('/items/genral', require('./routers/items/genral-router'))
app.use('/items/item', require('./routers/items/item-router'))
app.use('/items/storeSupler', require('./routers/items/storeSupler-router'))
app.use('/items/unit', require('./routers/items/unit-router'))

// stored Middelware
app.use('/stored/store', require('./routers/stored/store-router'))

// users Middelware
app.use("/users/user", require("./routers/users/user-router"));

// employees Middelware
app.use("/employees/employe",require('./routers/employees/employe-router'))

// Error Handelar
app.use(require("./error").notFound);
app.use(require("./error").errorHalnder);
console.log(process.env.PORT_SERVER);

// connect to server
app.listen(process.env.PORT_SERVER, () => {
  console.log(
    "connected sccefuly to server for back end " +
    process.env.PORT_SERVER
  );
});
