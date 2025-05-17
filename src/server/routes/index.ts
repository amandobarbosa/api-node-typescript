import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { CidadesController } from "../controlers";

const router = Router();

router.get("/", (_, res) => {
  return res.send("Olá dev!");
});
router.post("/cidades", CidadesController.create);

export { router };
