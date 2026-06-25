import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

//import routes
import authRoutes from "./routes/authRoutes.js";
import studentsRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import {authenticate} from "./middleware/auth.middleware.js"

//import middleware


const app = express();

// load environment variables
dotenv.config();
await connectDB();


app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", authenticate, studentsRoutes);
app.use("/api/courses", authenticate, courseRoutes);



const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Api is running...')
})

app.listen(PORT, () =>
    console.log(`Server running on at port ${PORT}`),
);