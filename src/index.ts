import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import callbackRoutes from './routes/callbackRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/', callbackRoutes);


app.listen(port, () => {
  console.log(`Authorization server running at http://localhost:${port}`);
});
