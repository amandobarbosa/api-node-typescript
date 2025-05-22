import { Request, Response } from "express";
import * as Yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";

interface IParamProps {
id?: number
}

export const DeleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    Yup.object().shape({
      id: Yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const DeleteById = async (req: Request<IParamProps>, res: Response) => {
  console.log(req.params.id);
  

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado");
};
