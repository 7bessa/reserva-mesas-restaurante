// src/components/Filtros.tsx
import type { StatusMesa } from "../types/Mesa";

interface FiltrosProps {
  busca: string;
  onBuscaChange: (valor: string) => void;
  filtroStatus: StatusMesa | "todos";
  onFiltroChange: (valor: StatusMesa | "todos") => void;
}

const statusDisponiveis: (StatusMesa | "todos")[] = [
  "todos",
  "livre",
  "reservada",
  "ocupada",
  "cancelada",
];

function Filtros({ busca, onBuscaChange, filtroStatus, onFiltroChange }: FiltrosProps) {
  return (
    <div className="filtros">
      <input
        type="text"
        placeholder="Buscar por nome do cliente..."
        value={busca}
        onChange={(e) => onBuscaChange(e.target.value)}
      />

      <div className="filtros-status">
        {statusDisponiveis.map((status) => (
          <button
            key={status}
            type="button"
            className={filtroStatus === status ? "ativo" : ""}
            onClick={() => onFiltroChange(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filtros;