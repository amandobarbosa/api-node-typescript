import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Cidades - get all", () => {
  it("buscar todos os registros", async () => {
    const res1 = await testeServer.post("/cidades").send({
      nome: "são paulo",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada = await testeServer.get("/cidades").send();
    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
