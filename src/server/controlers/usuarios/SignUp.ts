import { Request, Response } from "express";
import * as Yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IUsuario } from "../../database/models";
import { UsusariosProvider } from "../../database/providers/usuarios";

interface IBodyProps extends Omit<IUsuario, "id"> {}

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    Yup.object().shape({
      nome: Yup.string().required().min(3),
      email: Yup.string().min(5).required(),
      senha: Yup.string().required().min(6),
    })
  ),
}));

export const signUp = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await UsusariosProvider.create(req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
  return res.status(StatusCodes.CREATED).json(result);
};
