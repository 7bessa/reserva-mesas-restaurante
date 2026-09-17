// src/components/Resumo.tsx
import type { Mesa } from "../types/Mesa";

interface ResumoProps {
  mesas: Mesa[];
}

function Resumo({ mesas }: ResumoProps) {
  const total = mesas.length;
  const livres = mesas.filter((m) => m.status === "livre").length;
  const reservadas = mesas.filter((m) => m.status === "reservada").length;
  const ocupadas = mesas.filter((m) => m.status === "ocupada").length;
  const canceladas = mesas.filter((m) => m.status === "cancelada").length;
  const capacidadeTotal = mesas.reduce((acc, m) => acc + m.capacidade, 0);
  const percentualOcupacao = total > 0 ? Math.round((ocupadas / total) * 100) : 0;

  return (
    <div className="resumo">
      <h2>Resumo</h2>
      <p><strong>Total de mesas:</strong> {total}</p>
      <p><strong>Capacidade total:</strong> {capacidadeTotal} pessoas</p>
      <ul>
        <li>🟢 Livres: {livres}</li>
        <li>🟡 Reservadas: {reservadas}</li>
        <li>🔴 Ocupadas: {ocupadas}</li>
        <li>⚫ Canceladas: {canceladas}</li>
      </ul>
      <p><strong>Ocupação:</strong> {percentualOcupacao}%</p>
    </div>
  );
}

export default Resumo;