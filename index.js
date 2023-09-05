// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

// Import userRoutes

const userRoutes = require("./routes/bloggingRoute");

// from .env file
require("dotenv").config();

// Create an Express app
const app = express();

// Set the port to 7000
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const connectDb = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,useUnifiedTopology: true,});
    return console.log("MongoDB Successfully Connected...");
  } catch (err) {
    return console.log(err);
  }
};

// Middleware
app.use(express.json());
app.use(cors("http://localhost:3000"));
app.use(express.static('coaching'));
app.use(helmet());
app.use(morgan("common"));

// Default route
app.get("/", (req, res) => {
  res.send(`We are live on ${PORT}`);
});

// Connect to the database
connectDb();

// Define routes for user related operations
app.use("/blog", userRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {console.log(`Server running on port no ${PORT}!!!!!!`);});
