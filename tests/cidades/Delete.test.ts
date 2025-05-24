import { StatusCodes } from "http-status-codes";
import { testeServer } from "../jest.setup";

describe("Cidades - delete", () => {
  it("Tenta apagar um registro que existe", async () => {
    const res1 = await testeServer.post("/cidades").send({
      nome: "são paulo",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testeServer.delete(`/cidades/${res1.body}`).send();
    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta apagar um registro que não existe", async () => {
    const res1 = await testeServer.delete("/cidades/9999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
