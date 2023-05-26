const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// this handler will receive any events coming directly from event bus.
app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log(data);

  if (type == "CommentCreated") {
    data.status = data.content.includes("banana") ? "rejected" : "approved";
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data,
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("listening on port 4003.");
});
