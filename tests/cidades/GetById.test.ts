import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Cidades - get by id", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "GetById-cidades@gmail.com";
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
  it("buscar registro por id", async () => {
    const res1 = await testeServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: "são paulo4",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada = await testeServer.get(`/cidades/${res1.body}`).send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty("nome");
  });
  it("tenta buscar registro que não existe", async () => {
    const res1 = await testeServer.get("/cidades/9999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toEqual({
      errors: { default: "Registro não enconterado" },
    });
  });
});
