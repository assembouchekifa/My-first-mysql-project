import e from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router.js";

dotenv.config();

const app = e();
const port = process.env.SERVER_PORT || 3000;

app.use(e.json());
app.use(cors());

app.use("/message", router);

app.listen(port, () => {
  console.log(`server run in port ${port}`);
});
