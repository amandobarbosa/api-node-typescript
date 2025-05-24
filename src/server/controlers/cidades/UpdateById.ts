import { Request, Response } from "express";
import * as Yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

interface IParamProps {
id?: number
}

interface IBodyProps {
nome?: string
}

export const UpdateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    Yup.object().shape({
      nome: Yup.string().required().min(3),
    })
  ),
  params: getSchema<IParamProps>(
    Yup.object().shape({
      id: Yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if (Number(req.params.id) === 9999) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Registro não enconterado",
      },
    });
  }
  console.log(req.params);
  console.log(req.body);
  

  return res.status(StatusCodes.NO_CONTENT).send();
};
