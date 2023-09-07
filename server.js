require("dotenv").config();
const connectDB = require("./utils/connectDB");

const express = require("express");


const app = express();
const PORT = process.env.PORT || 3000;


const jsxEngine = require("jsx-view-engine");

const Tweet = require("./models/Tweets");
const manyTweets = require("./models/manyTweets");

const methodOverride = require("method-override");

// app config
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Working!");
});

// ======================== View Routes

//index
app.get("/tweets", async (req, res) => {
  try {
    const tweets = await Tweet.find({});
    // res.send(tweets)
    res.render("Index", { tweets });
  } catch (error) {
    console.log(error);
  }
});

/**
 * New form
 */
app.get("/tweets/new", (req, res) => {
  try {
    res.render("New");
  } catch (error) {
    console.log(error);
  }
});

/**
 * Edit form
 */
app.get("/tweets/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    //find tweet
    let tweetToEdit = await Tweet.findById(id);
    //return edit template with tweet data
    res.render("Edit", { tweetToEdit });
  } catch (error) {
    console.log(error);
  }
});

// show
app.get("/tweets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tweet = await Tweet.findById(id);
    // res.send(tweet)
    res.render("Show", { tweet });
  } catch (error) {
    console.log(error);
  }
});

// =========================== API Routes

//create post
app.post("/api/tweets", async (req, res) => {
  const createdTweet = await Tweet.create(req.body);
  console.log(createdTweet);
  res.redirect("/tweets");
});

//update
app.put("/api/tweets/:id", async (req, res) => {
  const { id } = req.params;
  if (req.body.sponsored === "on") {
    req.body.sponsored = true;
  } else {
    req.body.sponsored = false;
  }
  try {
    // const tweetToUpdate = await Tweet.findById(id)
    const updatedTweet = await Tweet.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.send(updatedTweet)
    res.redirect(`/tweets/${id}`);
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/tweets/add-comment/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tweetToAddComment = await Tweet.findById(id);
    tweetToAddComment.comments.push(req.body);
    const updatedTweet = await Tweet.findByIdAndUpdate(id, tweetToAddComment, {
      new: true,
      runValidators: true,
    });
    // res.send(updatedTweet)
    res.redirect(`/tweets/${id}`);
  } catch (error) {
    console.log(error);
  }
});

//increase likes
app.get("/api/tweets/add-like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tweetToUpdate = await Tweet.findById(id);
    tweetToUpdate.likes++;
    const updatedTweet = await Tweet.findByIdAndUpdate(id, tweetToUpdate, {
      new: true,
    });
    // res.send(updatedTweet)
    res.redirect(`/tweets/${id}`);
  } catch (error) {
    console.log(error);
  }
});

//delete
app.delete("/api/tweets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Tweet.findByIdAndRemove(id);
    // res.send('Tweet deleted')
    res.redirect("/tweets");
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/tweets/seed", async (req, res) => {
  const createdTweets = await Tweet.insertMany(manyTweets);
  res.send(createdTweets);
});

connectDB();

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
