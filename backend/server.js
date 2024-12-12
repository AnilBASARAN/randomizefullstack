import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import path from 'path';
import authRoutes from "./routes/auth.route.js";
import peopleRoutes from "./routes/people.route.js";




dotenv.config();
const PORT = process.env.PORT;
const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/people", peopleRoutes);
//app.use("/api/randomusers", randomRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}



app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});

/* "scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "nodemon backend/server.js",
  "start": "node backend/server.js"
}, */