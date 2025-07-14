import { Router } from "express";
import {
  CidadesController,
  PessoasController,
  UsuariosController,
} from "../controlers";
import { ensureAuthenticated } from "../shared/middlewares";

const router = Router();

router.get("/", (_, res) => {
  return res.send("Olá dev!");
});
router.post(
  "/cidades",
  ensureAuthenticated,
  CidadesController.createValidation,
  CidadesController.create
);
router.get(
  "/cidades",
  ensureAuthenticated,
  CidadesController.getAllValidation,
  CidadesController.getAll
);
router.get(
  "/cidades/:id",
  ensureAuthenticated,
  CidadesController.getByIdValidation,
  CidadesController.getById
);
router.put(
  "/cidades/:id",
  ensureAuthenticated,
  CidadesController.UpdateByIdValidation,
  CidadesController.updateById
);
router.delete(
  "/cidades/:id",
  ensureAuthenticated,
  CidadesController.DeleteByIdValidation,
  CidadesController.DeleteById
);

router.get(
  "/pessoas",
  ensureAuthenticated,
  PessoasController.getAllValidation,
  PessoasController.getAll
);
router.post(
  "/pessoas",
  ensureAuthenticated,
  PessoasController.createValidation,
  PessoasController.create
);
router.get(
  "/pessoas/:id",
  ensureAuthenticated,
  PessoasController.getByIdValidation,
  PessoasController.getById
);
router.put(
  "/pessoas/:id",
  ensureAuthenticated,
  PessoasController.UpdateByIdValidation,
  PessoasController.updateById
);
router.delete(
  "/pessoas/:id",
  ensureAuthenticated,
  PessoasController.DeleteByIdValidation,
  PessoasController.DeleteById
);

router.post(
  "/entrar",
  UsuariosController.signInValidation,
  UsuariosController.signIn
);
router.post(
  "/cadastrar",
  UsuariosController.signUpValidation,
  UsuariosController.signUp
);

export { router };
