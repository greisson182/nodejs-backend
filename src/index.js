const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

// conexão mongo atlas https://www.mongodb.com/
mongoose.connect("url",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
});

app.use(express.json());
app.use(cors());
app.use(routes);


app.listen(3333, () => {
    console.log('Server Roanding.')
});
