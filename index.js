require('dotenv/config');
const express = require('express');
const cors = require('cors');
const http = require('http');




const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1');

const corsOptions = { 
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
  app.use(cors(corsOptions));

  app.get("/", (req, res) => {
    res.send("Welcome to Solace!");
  });

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });