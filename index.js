require('dotenv/config');

// const cors = require('cors');
const http = require('http');
const app = require('./src/server');
const {connectDB } = require('./src/database/db');





const server = http.createServer(app);

const PORT = process.env.PORT


 
// app.use('/api/v1');

// const corsOptions = { 
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//     allowedHeaders: ['Content-Type', 'Authorization']
//   };

//   app.use(cors(corsOptions));



  // app.get("/", (req, res) => {
  //   res.send("Welcome to Solace!");
  // });

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
  });