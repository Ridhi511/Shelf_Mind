import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import analyzeRoute from "./routes/analyzeRoute.js";

dotenv.config();
console.log(process.env.GROQ_API_KEY);
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", analyzeRoute);

app.get("/", (req, res) => {
  res.send("ShelfMind API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});