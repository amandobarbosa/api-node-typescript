import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as Yup from "yup";

interface ICidade {
  nome: string;
}
const bodyValidation: Yup.ObjectSchema<ICidade> = Yup.object().shape({
  nome: Yup.string().required().min(3),
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let validateData: ICidade | undefined = undefined;
  try {
    validateData = await bodyValidation.validate(req.body);
  } catch (error) {
    const yupError = error as Yup.ValidationError;
    return res.json({
      errors: {
        default: yupError.message,
      },
    });
  }

  console.log(validateData);

  return res.send("create!");
};
