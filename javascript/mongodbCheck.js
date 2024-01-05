// Mongodb atlas 20bLReJfqCws9cWV
// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ServerApiVersion } = require("mongodb");

// const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
console.log("Connecting to MongoDB");
const uri =
  "mongodb+srv://hkesari:20bLReJfqCws9cWV@mongodbatlasfreeforcalc.psi2lxc.mongodb.net/?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017";
const dbName = "myproject_remote";
const collectionName = "mycollection_remote";

const remotemongo_client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function remote_run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await remotemongo_client.connect();
    // Send a ping to confirm a successful connection
    await remotemongo_client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the remotemongo_client will close when you finish/error
    await remotemongo_client.close();
  }
}

async function run(req, res) {
  checkDatabase();
  const client = remotemongo_client;

  try {
    // client = await MongoClient.connect(url);
    await client.connect();

    var dbo = client.db(dbName);
    console.log("req.body");
    // console.log(dbo);
    const result = await dbo.collection(collectionName).deleteMany({});
    console.log(`${result.deletedCount} documents were deleted.`);
    dbo.collection(collectionName).insertOne(req.body, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  } catch (err) {
    console.error("Failed to connect to server:", err);
  }
  checkDatabase();
}

async function checkDatabase() {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);

  try {
    const collection = db.collection(collectionName);
    const data = await collection.find().toArray();
    console.log(data);
  } catch (err) {
    console.error("Failed to retrieve data:", err);
  } finally {
    client.close();
  }

  // try {
  //   const collections = await db.listCollections().toArray();
  //   console.log(collections);
  // } catch (err) {
  //   console.error("Failed to retrieve collections:", err);
  // } finally {
  //   client.close();
  // }
}

async function saveDataToDataBase(req, res) {
  console.log("Server side: Saving data to database");
  run(req, res).catch(console.dir);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    console.log(dbo);
    con;
    dbo.collection("myCollection").insertOne(req.body, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
  res.json({ status: "success" });
}

async function getLaTexCodeStringFromDatabaseFunction(req, res) {
  console.log("Server side: inside the getLaTexCodeStringFromDatabaseFunction");
  //   const client = await MongoClient.connect(url);

  const client = remotemongo_client;

  try {
    await client.connect();
    const dbo = client.db(dbName);
    const collection = dbo.collection(collectionName);
    const document = await collection.findOne({});
    res.send(document.inputTextToSave);
  } catch (err) {
    console.error("Failed to retrieve string:", err);
    res.status(500).send(err);
  } finally {
    client.close();
  }
}

// run().catch(console.dir);
module.exports = {
  checkDatabase,
  saveDataToDataBase,
  run,
  getLaTexCodeStringFromDatabaseFunction,
  remote_run,
};
// run2().catch(console.dir);
