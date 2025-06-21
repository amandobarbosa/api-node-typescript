import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { Icidade } from "../../models";

export const updateById = async (
  id: number,
  cidade: Omit<Icidade, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .update(cidade)
      .where("id", "=", id);
    if (result > 0) return;
    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.error(error);
    return new Error("Erro ao atualizar o registro");
  }
};
