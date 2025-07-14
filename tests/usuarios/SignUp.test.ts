import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Usuarios - SignUp", () => {
  it("Cadastra usuario 1", async () => {
    const res1 = await testeServer.post("/cadastrar").send({
      senha: "123456",
      nome: "test test",
      email: "test@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual("number");
  });
  it("Erro ao cadastrar usuario", async () => {
    const res1 = await testeServer.post("/cadastrar").send({
      senha: "123456",
      nome: "test test",
      // email: "test@gmail.com",
    });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  });
});
