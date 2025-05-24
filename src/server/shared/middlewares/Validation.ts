import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AnyObject, Maybe, ObjectSchema, ValidationError } from "yup";

type tProperty = "body" | "header" | "params" | "query";
type TAllSchemas = Record<tProperty, ObjectSchema<any>>;
type IGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>)=> ObjectSchema<any>
type IGetAllSchemas = (getSchema: IGetSchema)=> Partial<TAllSchemas>
type TValidation = (getAllSchemas: IGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {

  const schemas = getAllSchemas((schema) => schema)

  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as tProperty], {
        abortEarly: false,
      });
    } catch (err) {
      const yupError = err as ValidationError;

      const errors: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if (!error.path) return;
        errors[error.path] = error.message;
      });
      errorsResult[key] = errors;
    }
  });

  if (Object.entries(errorsResult).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
  }
};
