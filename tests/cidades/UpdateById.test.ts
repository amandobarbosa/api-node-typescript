import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Cidades - update by id", () => {
  it("Atualiza registro", async () => {
    const res1 = await testeServer.post("/cidades").send({
      nome: "são paulo",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada = await testeServer.get(`/cidades/${res1.body}`).send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);

    const resAtualizada = await testeServer.put(`/cidades/${res1.body}`).send({
      nome: "caxias",
    })
    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testeServer.put("/cidades/9999").send({
      nome:'caxias'
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toEqual({ errors: { default: "Registro não enconterado" } });
  });
});
