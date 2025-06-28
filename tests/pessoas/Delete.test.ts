import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Pessoas - delete", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testeServer
      .post("/cidades")
      .send({ nome: "Teste" });
    cidadeId = resCidade.body;
  });
  it("Tenta apagar um registro que existe", async () => {
    const res1 = await testeServer.post("/pessoas").send({
      nomeCompleto: "Testando",
      cidadeId,
      email: "test25151@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testeServer.delete(`/pessoas/${res1.body}`).send();
    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta apagar um registro que não existe", async () => {
    const res1 = await testeServer.delete("/pessoas/9999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
