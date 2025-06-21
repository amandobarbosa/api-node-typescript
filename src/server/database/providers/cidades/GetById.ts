import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { Icidade } from "../../models";

export const getById = async (id: number): Promise<Icidade | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .select("*")
      .where("id", "=", id)
      .first();
    if (result) return result;
    return new Error("Registro não encontrado");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar o registro");
  }
};
