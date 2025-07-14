import { Request, Response } from "express";
import * as Yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IUsuario } from "../../database/models";
import { UsusariosProvider } from "../../database/providers/usuarios";
import { PasswordCrypto } from "../../shared/services";

interface IBodyProps extends Omit<IUsuario, "id" | "nome"> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    Yup.object().shape({
      email: Yup.string().min(5).email().required(),
      senha: Yup.string().required().min(6),
    })
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { email, senha } = req.body;

  const result = await UsusariosProvider.getByEmail(email);
  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são inválidos",
      },
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(senha, result.senha)
  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são inválidos",
      },
    });
  } else {
    return res.status(StatusCodes.OK).json({ accessToken: "test.test.test" });
  }
};
