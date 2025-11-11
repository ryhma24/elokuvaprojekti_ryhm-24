import express from 'express'
import cors from 'cors'
import accountRouter from "./server/routers/account_router.js";
import reviewsRouter from "./server/routers/reviews_router.js";

const port = process.env.port;

const app = express()

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", accountRouter);
app.use("/reviews", reviewsRouter); // /movie_data on sivun urliin lisättävä jos haluaa katsella

app.listen(port, () => {
  console.log(`Server is listening port ${port}`);
});
