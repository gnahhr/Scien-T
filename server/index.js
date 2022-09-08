const express = require ('express')
const  cors = require ('cors')
const bodyParser = require ('body-parser')
const authHandler = require('./routes/auth.js');
const mongoose = require ('mongoose')
require('dotenv/config')

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/', authHandler);

// DB Connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then( () => {
    console.log('DB Connected!');
})
.catch( (err) => {
    console.log(err);
});


const PORT = process.env.PORT || 6969; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});