require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const errorHandler = require("./config/errorHandler");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
const userRouter = require("./routers/user");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 8000;

const app = express();

const _dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }) 
);
app.options("*", cors());

app.use(cookieParser());

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter); 

app.use("/", requestRouter);
app.use("/", userRouter);

app.use(errorHandler);

app.use(express.static(path.join(_dirname, "/DevTinder frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(
    path.resolve(_dirname, "DevTinder frontend", "dist", "index.html")
  );
});

connectDB()
  .then(() => {
    console.log("Database connection established!😃"); 
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  })
  .catch(() => {
    console.error("Error connecting to the Database😥");
  });
