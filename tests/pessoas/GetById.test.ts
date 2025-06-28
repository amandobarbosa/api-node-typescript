import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Pessoas - get by id", () => {
    let cidadeId: number | undefined = undefined
  beforeAll(async()=>{
    const resCidade = await testeServer.post("/cidades").send({nome: "Teste"})
    cidadeId = resCidade.body
  })
  it("buscar registro por id", async () => {
    const res1 = await testeServer.post("/pessoas").send({
      nomeCompleto: "Testando",
      cidadeId,
      email: "test2564151@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada = await testeServer.get(`/pessoas/${res1.body}`).send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("nomeCompleto");
  });
  it("tenta buscar registro que não existe", async () => {
    const res1 = await testeServer.get("/pessoas/9999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
expect(res1.body).toEqual({ errors: { default: "Registro não enconterado" } });
  });
});
