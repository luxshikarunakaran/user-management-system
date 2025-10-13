import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import apiRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRouter);

app.use(errorHandler);

export default app;
