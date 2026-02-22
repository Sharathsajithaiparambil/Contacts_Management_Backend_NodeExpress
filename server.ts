import express, { Express } from 'express';
import errorHandler from './middleware/errorHandler';
import connectDB from './config/dbConnection';
import dotenv from 'dotenv';
import path from 'path';
import contactRoutes from './routes/contactRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

connectDB();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

