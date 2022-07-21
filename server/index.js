const express = require("express");
const path = require("path");
const asyncHandler = require("express-async-handler");
var cors = require("cors");

require("dotenv/config");

const databaseLayer = require("./databaseapi.js");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

//app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// app.get("/", (req, res) => {
//   res.redirect("http://localhost:3000/");
// });

app.get(
  "/search/:url(*)",
  asyncHandler(async (req, res) => {
    var url = req.params.url;
    var exists = await databaseLayer.ifExist(url);
    console.log(exists);
    res.json({
      repeat: exists,
    });
  })
);

app.get(
  "/getAll",
  asyncHandler(async (req, res) => {
    var urlMaps = await databaseLayer.getAll();
    res.json(urlMaps);
  })
);

app.get("/:key/gen/:urlToShorten(*)", (req, res) => {
  var url = req.params.urlToShorten;
  var key = req.params.key;
  databaseLayer.add(url, key);
  res.json({
    URL: req.params.urlToShorten,
    key: req.params.key,
  });
});

app.get(
  "/:shortenedURL",
  asyncHandler(async (req, res) => {
    var key = req.params.shortenedURL;
    var urlMap = await databaseLayer.retrieve(key);
    res.redirect(urlMap.url);
  })
);

if (!process.env.DEBUG) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}
