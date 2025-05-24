import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Cidades - create", () => {
  it("cria um resgistro", async () => {
    const res1 = await testeServer.post("/cidades").send({
      nome: "são paulo",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });
  it("Tenta criar um registro com nome muito curto", async () => {
    const res1 = await testeServer.post("/cidades").send({
      nome: "s",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });
});
