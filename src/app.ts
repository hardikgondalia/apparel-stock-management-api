import express from 'express';
import cors from 'cors';
import apparelRouter from './routes/apparel.routes';
import orderRouter from './routes/order.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/apparel', apparelRouter);
app.use('/api/order', orderRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

export default app;