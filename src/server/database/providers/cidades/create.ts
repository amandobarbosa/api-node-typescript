import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { Icidade } from "../../models";

export const create = async (
  cidade: Omit<Icidade, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.cidade)
      .insert(cidade)
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
