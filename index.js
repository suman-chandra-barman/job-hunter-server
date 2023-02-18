const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

// database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uhbaknf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// connect with database
const dbConnect = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
};
dbConnect();

// create database and collections
const fresherJobCollection = client.db("jobHunter").collection("fresherJobs");
const bdItCompaniesCollection = client
  .db("jobHunter")
  .collection("bdItCompanies");
const worldwideItCompaniesCollection = client
  .db("jobHunter")
  .collection("worldwideItCompanies");

// jobs api
app.get("/fresherJobs", async (req, res) => {
  try {
    const query = {};
    const fresherJobs = await fresherJobCollection.find(query).toArray();
    res.send(fresherJobs);
  } catch (error) {
    console.error(error);
  }
});
app.get("/bdITCompanies", async (req, res) => {
  try {
    const query = {};
    const bdITCompanies = await bdItCompaniesCollection.find(query).toArray();
    res.send(bdITCompanies);
  } catch (error) {
    console.error(error);
  }
});
app.get("/worldwideItCompanies", async (req, res) => {
  try {
    const query = {};
    const worldwideItCompanies = await worldwideItCompaniesCollection
      .find(query)
      .toArray();
    res.send(worldwideItCompanies);
  } catch (error) {
    console.error(error);
  }
});

// root api
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(port, () => {
  console.log("Job hunter server is running on port", port);
});
