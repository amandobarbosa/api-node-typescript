import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Cidades - get all", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "GetAll-cidades@gmail.com";
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
  it("buscar todos os registros", async () => {
    const res1 = await testeServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: "são paulo2",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada = await testeServer.get("/cidades").send();
    expect(Number(resBuscada.header["x-total-count"])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
