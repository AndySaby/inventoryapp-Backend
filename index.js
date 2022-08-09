import mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config';
import routes from './routes/index.js';
import cors from "cors";

const app = express();
const port = 8082;

 
mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  return res.status(200).send({
    message: 'Listening',
  });
});

app.use(routes);
app.listen(port, () => {
  console.log(`This app is listening on http://localhost:${port}`);
});
