// src/components/ReservaForm.tsx
import { useState } from "react";
import type { Mesa } from "../types/Mesa";

interface ReservaFormProps {
  mesas: Mesa[];
  onReservar: (
    mesaId: number,
    nomeCliente: string,
    quantidadePessoas: number,
    horario: string
  ) => void;
}

function ReservaForm({ mesas, onReservar }: ReservaFormProps) {
  const [mesaId, setMesaId] = useState<number>(0);
  const [nomeCliente, setNomeCliente] = useState("");
  const [quantidadePessoas, setQuantidadePessoas] = useState<number>(1);
  const [horario, setHorario] = useState("");

  // Filtra apenas mesas livres para o select
  const mesasLivres = mesas.filter((mesa) => mesa.status === "livre");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validação simples
    if (mesaId === 0 || nomeCliente.trim() === "" || horario === "") {
      alert("Preencha todos os campos antes de reservar.");
      return;
    }

    onReservar(mesaId, nomeCliente, quantidadePessoas, horario);

    // Reset completo do formulário
    setMesaId(0);
    setNomeCliente("");
    setQuantidadePessoas(1);
    setHorario("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={mesaId} onChange={(e) => setMesaId(Number(e.target.value))}>
        <option value={0}>Selecione a mesa</option>
        {mesasLivres.map((mesa) => (
          <option key={mesa.id} value={mesa.id}>
            Mesa {mesa.numero} - {mesa.area} (Cap: {mesa.capacidade})
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Nome do cliente"
        value={nomeCliente}
        onChange={(e) => setNomeCliente(e.target.value)}
      />
      <input
        type="number"
        min={1}
        placeholder="Número de pessoas"
        value={quantidadePessoas}
        onChange={(e) => setQuantidadePessoas(Number(e.target.value))}
      />
      <input
        type="time"
        value={horario}
        onChange={(e) => setHorario(e.target.value)}
      />
      <button type="submit">Reservar</button>
    </form>
  );
}

export default ReservaForm;