import { Router } from "express";
import { CidadesController, PessoasController, UsuariosController } from "../controlers";

const router = Router();

router.get("/", (_, res) => {
  return res.send("Olá dev!");
});
router.post(
  "/cidades",
  CidadesController.createValidation,
  CidadesController.create
);
router.get(
  "/cidades",
  CidadesController.getAllValidation,
  CidadesController.getAll
);
router.get(
  "/cidades/:id",
  CidadesController.getByIdValidation,
  CidadesController.getById
);
router.put(
  "/cidades/:id",
  CidadesController.UpdateByIdValidation,
  CidadesController.updateById
);
router.delete(
  "/cidades/:id",
  CidadesController.DeleteByIdValidation,
  CidadesController.DeleteById
);

router.get(
  "/pessoas",
  PessoasController.getAllValidation,
  PessoasController.getAll
);
router.post(
  "/pessoas",
  PessoasController.createValidation,
  PessoasController.create
);
router.get(
  "/pessoas/:id",
  PessoasController.getByIdValidation,
  PessoasController.getById
);
router.put(
  "/pessoas/:id",
  PessoasController.UpdateByIdValidation,
  PessoasController.updateById
);
router.delete(
  "/pessoas/:id",
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
