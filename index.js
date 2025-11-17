import ("./api src/middleware/flag-scheduler.js")
import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import "dotenv/config";
import { authenticateToken } from "./api src/middleware/auth.js";

import accountRouter from "./api src/routers/account_router.js";
import reviewsRouter from "./api src/routers/reviews_router.js";

const port = process.env.port;
const app = express()


//app.use(cors())
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true // Allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", accountRouter);
app.use("/reviews", authenticateToken, reviewsRouter); // lisätty atenticateToken suojaamaan reitti

app.listen(port, () => {
  console.log(`Server is listening port ${port}`);
});
