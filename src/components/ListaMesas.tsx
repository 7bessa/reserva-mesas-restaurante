// src/components/ListaMesas.tsx
import type { Mesa, StatusMesa } from "../types/Mesa";

interface ListaMesasProps {
  mesas: Mesa[];
  onCancelar: (mesaId: number) => void;
  onMudarStatus: (mesaId: number, novoStatus: StatusMesa) => void;
}

const statusOpcoes: StatusMesa[] = ["livre", "reservada", "ocupada", "cancelada"];

function ListaMesas({ mesas, onCancelar, onMudarStatus }: ListaMesasProps) {
  if (mesas.length === 0) {
    return <p>Nenhuma mesa encontrada.</p>;
  }

  return (
    <ul className="lista-mesas">
      {mesas.map((mesa) => (
        <li key={mesa.id} className={`mesa-status-${mesa.status}`}>
          <div className="mesa-info">
            <strong>Mesa {mesa.numero}</strong> - {mesa.area} - Capacidade: {mesa.capacidade} - Status: {mesa.status}
            {mesa.nomeCliente ? ` - Cliente: ${mesa.nomeCliente}` : ""}
            {mesa.horario ? ` - Horário: ${mesa.horario}` : ""}
          </div>

          <div className="mesa-acoes">
            <select
              value={mesa.status}
              onChange={(e) => onMudarStatus(mesa.id, e.target.value as StatusMesa)}
            >
              {statusOpcoes.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>

            {mesa.status === "reservada" && (
              <button onClick={() => onCancelar(mesa.id)}>Cancelar</button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ListaMesas;