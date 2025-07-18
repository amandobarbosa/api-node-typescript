import { PasswordCrypto } from "../../../shared/services";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";

export const create = async (
  usuario: Omit<IUsuario, "id">
): Promise<number | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);

    const [result] = await Knex(ETableNames.usuario)
      .insert({ ...usuario, senha: hashedPassword })
      .returning("id");
    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }
    return Error("Erro ao cadastrar o registro");
  } catch (error) {
    console.error(error);
    return Error("Erro ao cadastrar o registro");
  }
};
