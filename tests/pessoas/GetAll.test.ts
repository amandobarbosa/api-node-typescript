import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Pessoas - get all", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "Getall-pessoa@gmail.com";
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
      .send({ nome: "TesteGetAll" });
    cidadeId = resCidade.body;
  });
  it("buscar todos os registros", async () => {
    const res1 = await testeServer
      .post("/pessoas")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: "Testando",
        cidadeId,
        email: "testGetAll@gmail.com",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada = await testeServer.get("/pessoas").send();
    expect(Number(resBuscada.headers["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
