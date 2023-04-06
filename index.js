/* // require start
const express = require("express");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// collections start
const sectorsCollection = client.db("taskHK").collection("sectors");
const usersCollection = client.db("taskHK").collection("users");
// collections end

// mongo DB run function start
const run = async () => {
  try {
    // get all sectors API start
    app.get("/sectors", async (req, res) => {
      const query = {};
      const sectors = await sectorsCollection.find(query).toArray();
      res.send(sectors);
    });
    // get all sectors API end
    // post users data API start
    app.post("/user", async (req, res) => {
      const userData = req.body;
      const result = await usersCollection.insertOne(userData);
      res.send(result);
    });
    // post users data API end

    // get all users data API start
    app.get("/users", async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      res.send(users);
    });
    // get all users data API end

    // delete a user data API start
    app.delete("/deleteUser/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });
    // delete a user data API end

    // get single user to update API start
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });
    // get single user to update API end

    // update a user API start
    app.patch("/updateUser/:id", async (req, res) => {
      const id = req.params.id;
      const updatedName = req.body.updatedName;
      const updatedSector = req.body.updatedValue;
      const filter = { _id: ObjectId(id) };
      const updatedDoc = {
        $set: {
          name: updatedName,
          selectedSector: updatedSector,
        },
      };
      const result = await usersCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });
    // update a user API end
  } finally {
    // console.log();
  }
};

run().catch((error) => console.log(error));

// mongo DB run function end

// mongo DB connect end

// initial setup end
 */
// requires start
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
// requires end

// middlewears start
app.use(cors());
app.use(express.json());
// middlewears end

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2ahck7i.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  // collections start
  const addedTasksCollection = client.db("todoAppDBUser").collection("tasks");
  // collections end
  try {
    // store the tasks API start
    app.post("/addTask", async (req, res) => {
      const taskData = req.body;
      const result = await addedTasksCollection.insertOne(taskData);
      res.send(result);
    });
    // store the tasks API end

    // get tasks of an user API start
    app.get("/tasks", async (req, res) => {
      const userEmail = req.query;
      const query = { userEmail: userEmail.userEmail };
      const options = {
        sort: { createdAt: -1 },
      };
      const result = await addedTasksCollection.find(query, options).toArray();
      res.send(result);
    });
    // get tasks of an user API end

    // delete task API start
    app.delete("/task/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await addedTasksCollection.deleteOne(query);
      res.send(result);
    });
    // delete task API end

    // update the task data start
    app.patch("/updatedTask/:id", async (req, res) => {
      const id = req.params.id;
      const updatedTaskData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedData = {
        $set: {
          title: updatedTaskData.updatedTitle,
          description: updatedTaskData.updatedDescription,
          date: updatedTaskData.updatedDate,
        },
      };
      const result = await addedTasksCollection.updateOne(filter, updatedData);
      res.send(result);
    });
    // update the task data end
  } finally {
    console.log();
  }
};

run().catch((e) => console.log(e));

// default page API start
app.get("/", (req, res) => {
  res.send("Hellwet Soft Task Server");
});
// default page API end

// listen the server API start
app.listen(port, () => {
  console.log(`Hellwet Soft Task Server is Running on ${port}`);
});
// listen the server API end
