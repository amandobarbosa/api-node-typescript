import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Usuarios - SignUp", () => {
  beforeAll(async () => {
    await testeServer.post("/cadastrar").send({
      senha: "123456",
      nome: "test test",
      email: "test@gmail.com",
    });
  });

  it("Fazer login", async () => {
    const res1 = await testeServer.post("/entrar").send({
      senha: "123456",
      email: "test@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.OK);
    expect(typeof res1.body).toHaveProperty("accessToken");
  });
  it("Senha errada", async () => {
    const res1 = await testeServer.post("/entrar").send({
      senha: "1234567",
      email: "test@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });
  it("Email errado", async () => {
    const res1 = await testeServer.post("/entrar").send({
      senha: "123456",
      email: "teste@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
