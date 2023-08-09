const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3020;

const allowedOrigin = "http://localhost:3001";
app.use(cors({
  origin: allowedOrigin
}));

// Remove the express.json middleware

app.get("/", (req, res) => {
  res.send('hello');
});

app.post("/api/upload", (req, res) => {
  const chunks = [];

  req.on("data", (chunk) => {
    chunks.push(chunk);
  });

  req.on("end", () => {
    const imageBuffer = Buffer.concat(chunks);
    // Now you can work with the imageBuffer
    console.log('Image received:', imageBuffer);

    saveImageAsJpeg(imageBuffer);

    res.status(200).json({ message: "Image received successfully" });
  });
});

const saveImageAsJpeg = (imageBuffer) => {
  const fileName = `received_image_${Date.now()}.jpg`; // Generate a unique filename
  const filePath = path.join(__dirname, "images", fileName); // Path to the images folder

  // Write the imageBuffer to the file
  fs.writeFileSync(filePath, imageBuffer, "binary");
  console.log(`Image saved as ${fileName}`);
};


// testing according to https://medium.com/@divinehycenth8/convert-a-base64-data-into-an-image-in-node-js-d82136576e35
const base64 = fs.readFileSync("test.jpg", "base64");
const buffer = Buffer.from(base64, "base64");
fs.writeFileSync('new-path.jpg', buffer);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// Set up Multer storage
// const storage = multer.diskStorage({
//     destination: path.join(__dirname, "uploads"),
//     filename: function (req, file, cb) {
//         cb(null, "captured-image.jpg");
//     },
// });

// const upload = multer({ storage: storage });
// console.log('testing  upload', upload);
// app.post("/api/upload", upload.single("image"), (req, res) => {
//     console.log('req', req);

//     // res.json({ message: "Image saved successfully" });
//     res.send("helle hat funktioniert")
// });