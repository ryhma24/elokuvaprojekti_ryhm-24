import ("./api src/middleware/flag-scheduler.js")
import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import "dotenv/config";
import { authenticateToken } from "./api src/middleware/auth.js";

import accountRouter from "./api src/routers/account_router.js";
import reviewsRouter from "./api src/routers/reviews_router.js";
import favouritesRouter from './api src/routers/favourites_router.js';
import groupsRouter from './api src/routers/groups_router.js';
import groupMembersRouter from './api src/routers/group_members_router.js';
import { getFavourites } from './api src/controllers/favourites_controller.js';

const port = process.env.port;
const app = express()


//app.use(cors())
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true // Allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", accountRouter);

app.get("/favourites/:id", getFavourites);
app.use("/reviews", reviewsRouter);
// tästä alaspäin kaikki reitit suojataan //

app.use("/favourites", authenticateToken, favouritesRouter)
app.use("/group-members", groupMembersRouter);
app.use("/groups", groupsRouter);

app.listen(port, () => {
  console.log(`Server is listening port ${port}`);
});
export default app;
