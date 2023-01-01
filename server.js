const app = require("./app");
 require("./database/connect");
require("dotenv").config();


//security packages

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {});


