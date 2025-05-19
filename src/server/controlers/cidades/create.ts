import { Request, Response } from "express";
import * as Yup from "yup";
import { validation } from "../../shared/middlewares";

interface ICidade {
  nome: string;
  estado: string;
}
interface IFilter {
  filter?: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICidade>(
    Yup.object().shape({
      nome: Yup.string().required().min(3),
      estado: Yup.string().required().min(3),
    })
  ),
  query: getSchema<IFilter>(Yup.object().shape({
    filter: Yup.string().required().min(3),
  })),
}));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  console.log(req.body);
  return res.send("create");
};
