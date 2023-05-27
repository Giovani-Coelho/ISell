import { key } from "@/app/authenticate/AuthenticateAccount";
import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";


// export function ensureAuthenticate(req: Request, res: Response, next: NextFunction) {
//   const tokenHeader = req.headers.authorization;

//   const [, token] = tokenHeader.split(" ");

//   try {
//     const { user: id } = verify(token, key)

//     req.dadosMiddleware = 'Dados do middleware';

//     next();
//   } catch (error) {
//     res.status(400).json({ error: error })
//   }
// }

