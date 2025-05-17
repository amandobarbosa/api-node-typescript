import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

interface ICidade {
  nome: string;
  estado: string;
}
const bodyValidation: Yup.ObjectSchema<ICidade> = Yup.object().shape({
  nome: Yup.string().required().min(3),
  estado: Yup.string().required().min(3),
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let validateData: ICidade | undefined = undefined;
  try {
    validateData = await bodyValidation.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    const yupError = err as Yup.ValidationError;

    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }

  console.log(validateData);

  return res.send("create!");
};
