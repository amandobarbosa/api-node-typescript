import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Pessoas - get all", () => {
  let cidadeId: number | undefined = undefined
  beforeAll(async()=>{
    const resCidade = await testeServer.post("/cidades").send({nome: "Teste"})
    cidadeId = resCidade.body
  })
  it("buscar todos os registros", async () => {
    const res1 = await testeServer.post("/pessoas").send({
      nomeCompleto: "Testando",
      cidadeId,
      email: "test2564151@gmail.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada = await testeServer.get("/pessoas").send();
    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
