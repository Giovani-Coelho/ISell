import { key } from "@/app/authenticate/AuthenticateAccount";
import { TokenMissing } from "@/domain/authenticate/TokenMissing";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function ensureAuthenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      throw new TokenMissing()
    }

    const [, token] = tokenHeader.split(" ");

    verify(token, key)
    next();

  } catch (error) {
    if (error instanceof TokenMissing)
      return res.status(400).json({ error: error.message })

    return res.status(400).json({ error: error })
  }
}

