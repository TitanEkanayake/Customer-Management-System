import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./routes/users.js";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

app.use(bodyParser.json());

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Home Page");
});

app.listen(PORT, () =>
  console.log(`Server Running on port : http://localhost:${PORT}`)
);
