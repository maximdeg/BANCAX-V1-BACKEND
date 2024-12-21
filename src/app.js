import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.router.js";
import statusRouter from "./routes/status.router.js";
import userRouter from "./routes/user.router.js";
import transactionRouter from "./routes/transaction.router.js";

const app = express();

app.use(
    cors({
        origin: ["https://bancax.vercel.app", 'http://localhost:5173', 'http://localhost:3000'],
        credentials: true,
    })
);
app.use(express.json({ limit: "50mb" }));

app.use((req, res, next) => {
    console.log(`${req.method} ==> ${req.url}`);
    next();
});

app.use("/api/v1/status", statusRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", transactionRouter);

export default app;
