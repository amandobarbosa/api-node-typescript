import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Pessoas - update by id", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "updateById-pessoa@gmail.com";
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
      .send({ nome: "Teste" });
    cidadeId = resCidade.body;
  });
  it("Atualiza registro", async () => {
    const res1 = await testeServer
      .post("/pessoas")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: "Testando",
        cidadeId,
        email: "testUpdateById@gmail.com",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada = await testeServer
      .get(`/pessoas/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);

    const resAtualizada = await testeServer
      .put(`/pessoas/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: "Testando update",
        cidadeId,
        email: "test2564hc15156251@gmail.com",
      });
    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta atualizar registro que não existe", async () => {
    const res1 = await testeServer
      .put("/cidades/9999")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: "Testando update",
        cidadeId,
        email: "test2564hc151@gmail.com",
      });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toEqual({
      errors: { default: "Registro não enconterado" },
    });
  });
});
