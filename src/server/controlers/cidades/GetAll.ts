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
  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', 1);

  const fakeData = [{ id: 1, nome: 'Teste' }];

  return res.status(StatusCodes.OK).json(fakeData);
};
