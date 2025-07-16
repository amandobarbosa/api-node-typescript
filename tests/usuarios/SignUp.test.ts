import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Usuarios - SignUp", () => {
  let accessToken = "";
  beforeAll(async () => {
    const email = "create-signUp@gmail.com";
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

  it("Cadastra usuario 1", async () => {
    const res1 = await testeServer
      .post("/cadastrar")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        senha: "123456",
        nome: "test test",
        email: "testSignUp@gmail.com",
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Erro ao cadastrar usuario", async () => {
    const res1 = await testeServer.post("/cadastrar")
    .set({ Authorization: `Bearer ${accessToken}` })
    .send({
      senha: "123456",
      nome: "test test",
      // email: "test@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });
});
