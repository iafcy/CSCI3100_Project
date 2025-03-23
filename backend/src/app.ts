import express from 'express';
import cors from 'cors';

import threadRouter from './routes/threadRouter';
import categoryRouter from './routes/categoryRouter';
import commentRouter from './routes/commentRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/thread', threadRouter);
app.use('/category', categoryRouter);
app.use('/comment', commentRouter);

export default app;