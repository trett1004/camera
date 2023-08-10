const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const base64Img = require("base64-img");
const bodyParser = require("body-parser");

const app = express();
const port = 3020;

const allowedOrigin = "http://localhost:3000";
app.use(cors({
  origin: allowedOrigin
}));
app.use(bodyParser.json({ limit: "50mb" }));

// Remove the express.json middleware

app.get("/", (req, res) => {
  res.send('hello');
});

app.post("/api/upload", (req, res) => {
    console.log('Image received:', req.body);
    const { image } = req.body;
    base64Img.img(image, './images', Date.now(), function(err, filepath) {
        const pathArr = filepath.split('/');
        const fileName = pathArr[pathArr.length - 1];

        res.status(200).json({ message: "Image saved successfully: " + fileName });
  });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
