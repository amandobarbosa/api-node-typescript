import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Pessoas - create", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testeServer
      .post("/cidades")
      .send({ nome: "Teste" });
    cidadeId = resCidade.body;
  });
  it("cria um resgistro", async () => {
    const res1 = await testeServer.post("/pessoas").send({
      nomeCompleto: "Testando",
      cidadeId,
      email: "test2yfgj564151@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Tenta criar um registro com email duplicado", async () => {
    const res1 = await testeServer.post("/pessoas").send({
      nomeCompleto: "Testando",
      cidadeId,
      email: "test2yfgj564151@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
