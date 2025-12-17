import ("./middleware/flag-scheduler.js")
import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import "dotenv/config";
import { authenticateToken } from "./middleware/auth.js";

import accountRouter from "./routers/account_router.js";
import reviewsRouter from "./routers/reviews_router.js";
import favouritesRouter from './routers/favourites_router.js';
import groupsRouter from './routers/groups_router.js';
import groupMembersRouter from './routers/group_members_router.js';
import { getFavourites } from './controllers/favourites_controller.js';

const port = process.env.PORT
const app = express()
const host = process.env.DB_HOST

//app.use(cors())
app.use(cors({
  origin: ["https://elokuvaprojekti-ryhm-24.onrender.com",
            "http://localhost:5173"],
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
  console.log(`Server is hosting ${host}`);
});
export default app;
