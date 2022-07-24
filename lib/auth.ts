import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies[process.env.COOKIE_NAME];

    if (token) {
      let user;
      try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        console.log(id, 'here');
        user = await prisma.user.findUnique({
          where: {
            id,
          },
        });
        if (!user) throw new Error("Not real user");
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorized" });
        return;
      }
      return handler(req, res, user);
    }
    res.status(401);
    res.json({ error: "Not Authorized" });
  };
};
