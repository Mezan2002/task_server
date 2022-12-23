// require start
const express = require("express");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
// require end

// middle wares start
app.use(cors());
app.use(express.json());
// middle wares end

// initial setup start
app.get("/", (req, res) => {
  res.send("server is running");
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

// mongo DB connect start

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2ahck7i.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// collections start
const sectorsCollection = client.db("taskHK").collection("sectors");
// collections end

// mongo DB run function start
const run = async () => {
  try {
    app.get("/sectors", async (req, res) => {
      const query = {};
      const sectors = await sectorsCollection.find(query).toArray();
      res.send(sectors);
    });
  } finally {
    // console.log();
  }
};

run().catch((error) => console.log(error));

// mongo DB run function end

// mongo DB connect end

// initial setup end
