// src/App.tsx
import { useState } from "react";
import type { Mesa, StatusMesa } from "./types/Mesa";
import ReservaForm from "./components/ReservaForm";
import Resumo from "./components/Resumo";
import ListaMesas from "./components/ListaMesas";
import Filtros from "./components/Filtros";
import "./App.css";

function App() {
  const [mesas, setMesas] = useState<Mesa[]>([
    { id: 1, numero: 1, capacidade: 4, area: "Salão", status: "livre" },
    { id: 2, numero: 2, capacidade: 2, area: "Varanda", status: "reservada" },
    { id: 3, numero: 3, capacidade: 6, area: "Salão", status: "ocupada" },
    { id: 4, numero: 4, capacidade: 4, area: "Área Externa", status: "livre" },
    { id: 5, numero: 5, capacidade: 2, area: "Varanda", status: "cancelada" },
  ]);

  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<StatusMesa | "todos">("todos");

  function handleReservar(
    mesaId: number,
    nomeCliente: string,
    quantidadePessoas: number,
    horario: string
  ) {
    const mesa = mesas.find((m) => m.id === mesaId);
    if (!mesa) return;

    if (mesa.status !== "livre") {
      alert("Esta mesa não está disponível para reserva.");
      return;
    }

    if (quantidadePessoas > mesa.capacidade) {
      alert("Quantidade de pessoas excede a capacidade da mesa.");
      return;
    }

    const reservasNesseHorario = mesas.filter(
      (m) => m.status === "reservada" && m.horario === horario
    ).length;

    if (reservasNesseHorario >= 3) {
      alert("Limite de 3 reservas simultâneas por horário atingido.");
      return;
    }

    setMesas((prev) =>
      prev.map((m) =>
        m.id === mesaId ? { ...m, status: "reservada", nomeCliente, horario } : m
      )
    );
  }

  function handleCancelar(mesaId: number) {
    setMesas((prev) =>
      prev.map((mesa) =>
        mesa.id === mesaId
          ? { ...mesa, status: "livre", nomeCliente: undefined, horario: undefined }
          : mesa
      )
    );
  }

  function handleMudarStatus(mesaId: number, novoStatus: StatusMesa) {
    setMesas((prev) =>
      prev.map((mesa) =>
        mesa.id === mesaId
          ? {
              ...mesa,
              status: novoStatus,
              nomeCliente: novoStatus === "livre" ? undefined : mesa.nomeCliente,
              horario: novoStatus === "livre" ? undefined : mesa.horario,
            }
          : mesa
      )
    );
  }

  // Filtro + Busca (ignorando maiúsc/minúsc)
  const mesasFiltradas = mesas.filter((mesa) => {
    const matchStatus = filtroStatus === "todos" || mesa.status === filtroStatus;
    const matchBusca =
      busca.trim() === "" ||
      (mesa.nomeCliente ?? "").toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

  return (
    <div className="container">
      <header className="cabecalho">
        <h1>Reserva de Mesas em Restaurante</h1>
        <p className="codigo">PP-166GBWU-18OVORD</p>
      </header>

      <Resumo mesas={mesas} />

      <Filtros
        busca={busca}
        onBuscaChange={setBusca}
        filtroStatus={filtroStatus}
        onFiltroChange={setFiltroStatus}
      />

      <ListaMesas
        mesas={mesasFiltradas}
        onCancelar={handleCancelar}
        onMudarStatus={handleMudarStatus}
      />

      <ReservaForm mesas={mesas} onReservar={handleReservar} />
    </div>
  );
}

export default App;