import { Request } from "express";
import filter from "./../interfaces/Test/AdminFilter";

const queryTestFilter = (req: Request): filter => {
  const { ids_habilidades, ids_stacks, tipo, pagina }: any = req.query;

  let userFilters: filter = {
    pagina: 1,
    ids_habilidades: undefined,
    ids_stacks: undefined,
    tipo: undefined,
  };

  if (tipo) {
    userFilters.tipo = tipo;
  }

  if (ids_habilidades) {
    userFilters.ids_habilidades = ids_habilidades
      .split(" ")
      .map((value: string) => parseInt(value));
  }

  if (ids_stacks) {
    userFilters.ids_stacks = ids_stacks
      .split(" ")
      .map((value: string) => parseInt(value));
  }

  if (pagina) {
    userFilters.pagina = parseInt(pagina);
  }

  userFilters.pagina -= 1;

  return userFilters;
};

export default queryTestFilter;
