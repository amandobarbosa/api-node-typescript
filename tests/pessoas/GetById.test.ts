import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Pessoas - get by id", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "getById-pessoa@gmail.com";
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
      .send({ nome: "TesteUpdate" });
    cidadeId = resCidade.body;
  });
  it("buscar registro por id", async () => {
    const res1 = await testeServer
      .post("/pessoas")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: "Testando",
        cidadeId,
        email: "testUpdate@gmail.com",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada = await testeServer.get(`/pessoas/${res1.body}`).send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("nomeCompleto");
  });
  it("tenta buscar registro que não existe", async () => {
    const res1 = await testeServer
      .get("/pessoas/9999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toEqual({
      errors: { default: "Registro não enconterado" },
    });
  });
});
