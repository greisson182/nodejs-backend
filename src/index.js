require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

// conexão mongo atlas https://www.mongodb.com/
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
});

app.use(express.json());
app.use(cors());
app.use(routes);

const PORT = process.env.PORT || 3333

server.listen(PORT, () => {
    console.log('Server Roanding.')
});
