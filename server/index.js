const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3020;

const allowedOrigin = "http://localhost:3001"
app.use(cors({
origin: allowedOrigin
}));


// Set up Multer storage
const storage = multer.diskStorage({
    destination: path.join(__dirname, "uploads"),
    filename: function (req, file, cb) {
        cb(null, "captured-image.jpg");
    },
});

const upload = multer({ storage: storage });
console.log('testing  upload', upload);

app.get("/", (req, res) => {
    res.send('hello');
})

app.post("/api/upload", upload.single("image"), (req, res) => {
    console.log('req', req.body);

    // res.json({ message: "Image saved successfully" });
    res.send("helle hat funktioniert")
});
// API endpoint to save image

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
