const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT;
app.use(cors());

app.use(express.json());
const dbUrl = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(dbUrl, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");

    // Our Collections in Database
    const postCollection = client.db("database").collection("posts");
    const userCollection = client.db("database").collection("users");

    // GET
    app.get("/post", async (req, res) => {
      try {
        const post = (await postCollection.find().toArray()).reverse();
        res.send(post);
      } catch (error) {
        res.status(500).send({ message: "Error fetching posts", error });
      }
    });
    app.get("/user-post", async (req, res) => {
      const { email } = req.query;
      try {
        const post = (
          await postCollection.find({ userEmail: email }).toArray()
        ).reverse();
        res.send(post);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error fetching Users all posts", error });
      }
    });
    app.get("/user", async (req, res) => {
      try {
        const users = await userCollection.find().toArray();
        res.send(users);
      } catch (error) {
        res.status(500).send({ message: "Error fetching Users GET", error });
      }
    });
    // POST
    app.post("/post", async (req, res) => {
      try {
        const post = req.body;
        const result = await postCollection.insertOne(post);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error creating post", error });
      }
    });
    //Users
    app.post("/register", async (req, res) => {
      try {
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error creating User", error });
      }
    });
    //get the User Object from userColl
    app.get("/loggedInUser", async (req, res) => {
      const email = req.query.email;
      const user = await userCollection.find({ email: email }).toArray();
      res.send(user);
    });
    //PATCH for Updating User Info
    app.patch("/user-updates", async (req, res) => {
      try {
        const email = req.query.email; // Correctly extract the email from query parameters
        const profileUpdate = req.body;

        if (!email) {
          return res.status(400).send({ message: "Email is required" });
        }

        console.log("Email:", email);
        console.log("Profile Update:", profileUpdate);

        // Ensure email is a string and the filter object is properly constructed
        const filter = { email: email.toString() };
        console.log("Filter:", filter);

        const updateDocument = { $set: profileUpdate };
        const options = { upsert: true };

        const result = await userCollection.updateOne(
          filter,
          updateDocument,
          options
        );
        console.log("Update Result:", result);

        res.send(result);
      } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // Start the server after a successful connection
    app.listen(port, () => {
      console.log("Listening on port:", port);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit process with failure
  }
}

run().catch(console.dir);
