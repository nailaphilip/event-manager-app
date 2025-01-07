const jsonServer = require("json-server");
const multer = require("multer");
const path = require("path");
const express = require("express"); // Import express

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const upload = multer({
    dest: 'uploads/', // Temporary storage location
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // Get the file extension from the original filename
      cb(null, `${Date.now()}${ext}`); // Rename the file with a timestamp and original extension
    },
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed'), false);
      }
      cb(null, true); // Allow the file upload
    }
  });
  

server.use(middlewares);

// Serve the uploads directory as static files
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.post("/upload", upload.single("photo"), (req, res) => {
  if (req.file) {
    res.json({ fileUrl: `uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ error: "No file uploaded" });
  }
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running on port 3001");
});
