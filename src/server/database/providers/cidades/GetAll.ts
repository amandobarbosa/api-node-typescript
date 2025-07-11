import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { Icidade } from "../../models";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<Icidade[] | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .select("*")
      .where("id", Number(id))
      .orWhere("nome", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);
    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(ETableNames.cidade)
        .select("*")
        .where("id", "=", id)
        .first();
      if (resultById) return [...result, resultById];
    }
    return result;
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar registros");
  }
};
