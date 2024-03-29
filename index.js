const express = require ('express')
const cors = require ('cors')
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose')
// const path = require ('path')

require('dotenv/config')

const app = express();
app.use(cors())
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit:'100mb'}));
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/general'))

// DB Connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then( () => {
    console.log('DB Connected!');
})
.catch( (err) => {
    console.log(err);
});


const PORT = process.env.PORT || 6969; // backend routing port

// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//     // Set static folder
//     app.use(express.static('client/build'));
  
//     app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
//   }

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});