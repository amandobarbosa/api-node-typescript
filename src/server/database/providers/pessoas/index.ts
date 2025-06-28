import * as create from "./create";
import * as deleteById from "./DeleteById";
import * as getById from "./GetById";
import * as getAll from "./GetAll";
import * as updateById from "./UpdateById";
import * as count from "./Count";

export const PessoasProvider = {
  ...create,
  ...deleteById,
  ...getById,
  ...getAll,
  ...updateById,
  ...count,
};
