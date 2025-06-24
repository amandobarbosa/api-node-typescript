import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.cidade).count<[{ count: number }]>(
    "* as count"
  );
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const cidadesRandom = [
    "Acrelândia",
    "Assis Brasil",
    "Brasiléia",
    "Bujari",
    "Capixaba",
    "Cruzeiro do Sul",
    "Epitaciolândia",
    "Feijó",
    "Jordão",
    "Mâncio Lima",
    "Manoel Urbano",
    "Marechal Thaumaturgo",
    "Plácido de Castro",
    "Porto Acre",
    "Porto Walter",
    "Rio Branco",
    "Rodrigues Alves",
    "Santa Rosa do Purus",
    "Senador Guiomard",
    "Sena Madureira",
    "Tarauacá",
    "Xapuri",
    "Água Branca",
    "Anadia",
    "Arapiraca",
    "Atalaia",
    "Barra de Santo Antônio",
    "Barra de São Miguel",
    "Batalha",
    "Belém",
    "Boca da Mata",
    "Branquinha",
    "Cacimbinhas",
    "Cajueiro",
    "Campestre",
    "Campo Alegre",
    "Campo Grande",
    "Canapi",
    "Capela",
    "Carneiros",
    "Chã Preta",
    "Coité do Nóia",
    "Colônia Leopoldina",
    "Coqueiro Seco",
    "Coruripe",
    "Craíbas",
  ];

  const cidadesToInsert = cidadesRandom.map((nomeCidade) => ({
    nome: nomeCidade,
  }));

  await knex(ETableNames.cidade).insert(cidadesToInsert);
};
