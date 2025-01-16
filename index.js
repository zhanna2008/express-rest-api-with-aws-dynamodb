import express from "express";
import userRoutes from "./routes/userRoute.js";

const app = express();

app.use(express.json());

app.use("/api", userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
