import express, { NextFunction, Request, Response } from "express"
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes)

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof Error) {
    return res.status(500).send({
      status: 500,
      message: "Internal server error"
    })
  }
})

app.listen(process.env.PORT, () => console.log("🟢 Server Running!"));
