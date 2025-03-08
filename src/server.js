require("dotenv/config");
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');
const authRouter = require("./routes/authRoute");
const cookieParser = require('cookie-parser');



const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = { 
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };

app.use(cors());
app.use(cookieParser());





// routes
app.get("/", (req, res) => {
    res.send("Welcome to Solace!");
  });

app.use('/auth' , authRouter)




// Error handler
app.use(errorHandler)



module.exports = app;

// app.listen(PORT, async () => {
//     await connectDB()
//     console.log(`Server started. Listening on http://localhost:${PORT}`)
// })
