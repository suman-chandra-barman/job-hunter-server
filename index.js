const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 5000;

// middleware
app.use(cors());

// database connect
const uri =
  "mongodb+srv://<username>:<password>@cluster0.uhbaknf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// root api
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(port, () => {
  console.log("Job hunter server is running on port", port);
});
