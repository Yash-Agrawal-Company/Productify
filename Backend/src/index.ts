import express from 'express';
import cors from 'cors';
import {ENV} from "./config/env";
import { clerkMiddleware } from '@clerk/express'
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import commentRoutes from './routes/commentRoutes';
const app = express();

app.use(cors({origin : ENV.FRONTEND_URL})); // allow requests from frontend
app.use(clerkMiddleware()); // auth object will be available on req.auth
app.use(express.json()) // parses JSON request bodies
app.use(express.urlencoded({extended : true})) //Parses form data like HTML form


app.get('/', (req, res) => {
    res.json(
        {
            message: 'Welcome to productify API , It is powered by PERN Stack and Drizzle ORM and Clerk auth',
            endpoints: {
                users: "api/users",
                products: "api/products",
                comments: "api/comments",
            }
        }
    );
});

app.use("/api/users",userRoutes)
app.use("/api/products",productRoutes)
app.use("/api/comments",commentRoutes)

app.listen(ENV.PORT, () => { console.log('Server started on port', ENV.PORT) });