import { Request, Response } from "express";

export const testController = {
  test: async function (req: Request, res: Response) {
    res.status(200).send({
      test: "test",
    });
  },
};
