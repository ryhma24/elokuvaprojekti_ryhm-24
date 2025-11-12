import express from 'express'
import cors from 'cors'
import accountRouter from "./api src/routers/account_router.js";
import reviewsRouter from "./api src/routers/reviews_router.js";
import App from './frontend/src/App.js';

const port = 3001;

const app = express()

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/App", App)
app.use("/", accountRouter);
app.use("/reviews", reviewsRouter); // /movie_data on sivun urliin lisättävä jos haluaa katsella

app.listen(port, () => {
  console.log(`Server is listening port ${port}`);
});
