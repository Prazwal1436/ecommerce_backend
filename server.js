const express =require("express");
require('dotenv').config() // to .env files

const app = express();
app.use(express.json()); // read the body content of our request 
// handle cross origin resource sharing 


const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/mydatabase'; // Update with your MongoDB URI

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(error => {
  console.error('Error connecting to MongoDB:', error);
});


app.use("", (req, res) => {
    return res.status(404).send({
        message: "the requested resource doesnot exist."
    })
})

app.listen(process.env.PORT, (data, err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("server started");

    }
})
