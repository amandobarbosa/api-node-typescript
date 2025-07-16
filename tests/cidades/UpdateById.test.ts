import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Cidades - update by id", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "UpdateByid-cidades@gmail.com";
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
  it("Atualiza registro", async () => {
    const res1 = await testeServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })

      .send({
        nome: "são paulo5",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada = await testeServer.get(`/cidades/${res1.body}`).send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);

    const resAtualizada = await testeServer.put(`/cidades/${res1.body}`).send({
      nome: "caxias1",
    });
    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testeServer.put("/cidades/9999").send({
      nome: "caxias",
    });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toEqual({
      errors: { default: "Registro não enconterado" },
    });
  });
});
