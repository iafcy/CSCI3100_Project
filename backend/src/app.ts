import express from 'express';
import cors from 'cors';

import threadRouter from './routes/threadRouter';
import categoryRouter from './routes/categoryRouter';
import commentRouter from './routes/commentRouter';
import userRouter from './routes/userRouter';
import licenseRouter from './routes/licenseRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/thread', threadRouter);
app.use('/category', categoryRouter);
app.use('/comment', commentRouter);
app.use('/user', userRouter);
app.use('/license', licenseRouter);

export default app;