import { Router } from "express";
import { CidadesController } from "../controlers";

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

export { router };
