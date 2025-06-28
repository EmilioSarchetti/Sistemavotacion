// src/utils/api.js
// Cambia la URL si tu backend corre en otro host/puerto
const BASE = "http://172.20.10.13:4000/api/votes";

/* POST /api/votes */
export const votar = async (datos) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });

  const json = await res.json();
  if (!res.ok) {
    // Muestra el mensaje detallado que viene del backend
    throw new Error(json.msg || "Error al votar");
  }
};

/* GET /api/votes/results */
export const resultados = () =>
  fetch(`${BASE}/results`).then(res => res.json());

/* GET /api/votes/voters */
export const votantes = () =>
  fetch(`${BASE}/voters`).then(res => res.json());
