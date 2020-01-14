const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://bootweb:1Df8NHr65sEDmGsS@cluster0-06ien.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
});

app.use(express.json());
app.use(routes);


app.listen(3333, () => {
    console.log('Server Roanding.')
});