const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const cors = require('cors');
const path = require('path');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

function authorization(req, res, next){
  req.id = 1  
  next()
}


// Serve static files from the server
const publicDirectory = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(publicDirectory));


//store in uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    //store with user_id or quiz_id as filename
    cb(null, req.id.toString() )
  }
})

const upload = multer({ storage: storage })

// Define a route to handle the form submission
app.post('/upload', authorization,upload.single('file'), (req, res) => {
  res.send({"message":'Form data and file received.'});
});

app.listen(3001, () => {
  console.log('Server is running on port 3000');
});

