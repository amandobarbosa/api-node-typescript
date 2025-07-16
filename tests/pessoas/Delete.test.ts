import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Pessoas - delete", () => {

    let accessToken = "";
  beforeAll(async () => {
    const email = "delete-pessoa@gmail.com";
    await testeServer.post("/cadastrar").send({
      nome: "Teste",
      email,
      senha: "123456",
    });
    const signInRes = await testeServer.post("/entrar").send({
      email,
      senha: "123456",
    });

    accessToken = signInRes.body.accessToken;
  });
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testeServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: "TesteDelete" });
    cidadeId = resCidade.body;
  });
  it("Tenta apagar um registro que existe", async () => {
    const res1 = await testeServer.post("/pessoas")
    .set({ Authorization: `Bearer ${accessToken}` })
    .send({
      nomeCompleto: "Testando",
      cidadeId,
      email: "testDelete@gmail.com",
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
