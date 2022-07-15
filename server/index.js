const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/Auth.js");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Troubleshooting...");
});

app.listen(PORT, () =>
  console.log(`Server running at port http://localhost:${PORT}/`)
);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to database successfully.`))
  .catch((error) => console.log(error.message));

app.use(
  cors({
    origin: [`http://localhost:3000`],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
