import express from "express"
const app = express();
import authRouter from "./routes/authRouter.js";
import morgan from "morgan"
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("hiiii");
})

app.use("/api/auth", authRouter)

const PORT = 3000;
app.listen(PORT, () => {
    console.log("app is listning on port 3000");
})