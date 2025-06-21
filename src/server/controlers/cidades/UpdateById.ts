import { Request, Response } from "express";
import * as Yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { Icidade } from "../../database/models";
import { CidadesProvider } from "../../database/providers/cidades";

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<Icidade, "id"> {}

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

export const updateById = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id' precisa ser informado",
      },
    });
  }
  const result = await CidadesProvider.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
