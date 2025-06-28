import { useEffect, useState } from "react";
import { resultados, votantes } from "../utils/api"; // nombres correctos

export default function Results({ refreshFlag }) {
  const [totales, setTotales] = useState([]);
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const r = await resultados();
        const v = await votantes();
        setTotales(r);
        setLista(v);
      } catch (error) {
        console.error("Error al cargar resultados:", error);
      }
    };

    obtenerDatos();
  }, [refreshFlag]);

  return (
    <div>
      <h2>Totales</h2>
      {totales.length > 0 ? (
        totales.map((r) => (
          <p key={r._id}>
            {r._id}: {r.total}
          </p>
        ))
      ) : (
        <p>No hay votos registrados</p>
      )}

      <h2>Votantes</h2>
      <table>
        <thead>
          <tr>
            <th>DNI</th>
            <th>Edad</th>
            <th>Sexo</th>
            <th>Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {lista.length > 0 ? (
            lista.map((v, i) => (
              <tr key={i}>
                <td>{v.dni}</td>
                <td>{v.edad}</td>
                <td>{v.sexo}</td>
                <td>{v.nacimiento}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No hay votantes registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
