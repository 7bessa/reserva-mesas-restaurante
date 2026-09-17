// src/types/Mesa.ts

export type StatusMesa = "livre" | "reservada" | "ocupada" | "cancelada";

export interface Mesa {
  id: number;
  numero: number;
  capacidade: number;
  area: string;
  status: StatusMesa;
  nomeCliente?: string;
  horario?: string;
}