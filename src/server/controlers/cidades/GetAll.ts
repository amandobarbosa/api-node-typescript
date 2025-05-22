import { Request, Response } from "express";
import * as Yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    Yup.object().shape({
      page: Yup.number().optional().moreThan(0),
      limit: Yup.number().optional().moreThan(0),
      filter: Yup.string().optional(),
    })
  ),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  console.log(req.query);
  

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado");
};
