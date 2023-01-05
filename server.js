const app = require("./app");
 const connectDb=require("./database/connect");
require("dotenv").config();


//security packages

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`you are listening on port ${PORT}`)
});

connectDb(process.env.MONGO_URI)

