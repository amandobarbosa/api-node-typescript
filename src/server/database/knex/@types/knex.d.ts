import { Icidade } from "../../models";

declare module "knex/types/table" {
  interface Tables {
    cidade: Icidade
    // pessoa: IPessoa
    // usuario: IUsuario
  }
}
