const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const http = require("http");
const { log } = require("console");
const port = 5555;
// const app = express();
const app = require("express")();

app.use(express.json());
app.use(cors());
dotenv.config();

const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
io.listen(4444);
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: "*" },
// });
io.on("connection", (clientSocket) => {
  console.log("user connected", clientSocket.id);
  io.emit("success", "Connection success: Socket");
});
app.listen(port, () => {
  console.log("Listening on port:", port);
  io.emit("success", "Connection success: Socket");
});
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

    // task 2
    // listen to new post added to collection
    const changeStream = postCollection.watch();
    changeStream.on("change", (change) => {
      if (change.operationType == "insert") {
        const newPost = change.fullDocument;
        const newPostKeywords = ["cricket", "science"];
        const containsKeywords = newPostKeywords.some((keyword) =>
          newPost.tweetText.includes(keyword)
        );
        console.log("new post detected: changeStream");
        if (containsKeywords) {
          // send notification's event through socket.
          io.emit("notify", newPost);
          log(io);
        }
      }
    });

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
    // task 1
    // //////chatbot
    app.post("/search", async (req, res) => {
      const { query } = req.body;
      console.log(req.body);
      // console.log(query);
      const keyword = extractKeywordFromQuery(query);

      if (!keyword) {
        return res
          .status(400)
          .json({ message: "No valid keyword found in query" });
      }
      // search the posts that has specific keyword
      const searchedPosts = await postCollection
        .find({
          tweetText: { $regex: keyword, $options: "i" },
        })
        .toArray();
      res.status(200).json({ keyPosts: searchedPosts, keyword: keyword });

      try {
      } catch (err) {
        res.status(400).json({ message: "could not find" });
      }
    });

    // Start the server after a successful connection
    // app.listen(port, () => {
    //   console.log("Listening on port:", port);
    //   io.emit("success", "Connection success: Socket");
    // });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit process with failure
  }
}
function extractKeywordFromQuery(query) {
  const words = query.split(" ");
  const stopWords = [
    "what",
    "is",
    "the",
    "show",
    "me",
    "about",
    "in",
    "or",
    "and",
  ];
  const keywords = words.filter(
    (word) => !stopWords.includes(word.toLowerCase())
  );
  return keywords.length > 0 ? keywords[0] : null;
}
run().catch(console.dir);
