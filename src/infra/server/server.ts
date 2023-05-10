import express, { NextFunction, Request, Response } from "express"
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes)

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  return res.status(500).json({
    status: 500,
    message: err.message,
  });
});


app.listen(process.env.PORT, () => console.log("🟢 Server Running!"));
