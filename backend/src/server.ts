import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import groupRouter from "./routers/groupRouter";
import userRouter from "./routers/userRouter";
import sessionRouter from "./routers/sessionRouter";
import banRouter from "./routers/banRouter";
import authRouter from "./routers/authRouter";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(authRouter);
app.use("/groups", groupRouter);
app.use("/users", userRouter);
app.use("/sessions", sessionRouter);
app.use("/bans", banRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
