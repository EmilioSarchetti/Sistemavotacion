// src/components/VoteForm.jsx
import { useState } from "react";
import { votar } from "../utils/api";

// Lista de candidatos
const candidatos = [
  "Candidato Jorge Nadie",
  "Candidato Juan Domingo Perdon",
  "Candidato Voto Blanco",
  "Candidato Elvira Justa",
  "Candidato Sofía Tridente",
  "Candidato Franco del Pueblo"
];

const initial = {
  dni: "",
  nombre: "",
  edad: "",
  sexo: "",
  nacimiento: "",
  residencia: "",
  candidato: ""
};

export default function VoteForm({ onVoto = () => {} }) {
  const [form, setForm] = useState(initial);

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await votar({ ...form, edad: +form.edad });
      alert("✅ Voto registrado");
      setForm(initial);
      onVoto();
    } catch (err) {
      alert("⚠️ " + err.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Emitir voto</h2>

      <div>
        <label>DNI:</label>
        <input
          name="dni"
          type="text"
          value={form.dni}
          onChange={handle}
          required
        />
      </div>

      <div>
        <label>Nombre Completo:</label>
        <input
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={handle}
          required
        />
      </div>

      <div>
        <label>Edad:</label>
        <input
          name="edad"
          type="number"
          value={form.edad}
          onChange={handle}
          required
        />
      </div>

      <div>
        <label>Lugar de Nacimiento:</label>
        <input
          name="nacimiento"
          type="text"
          value={form.nacimiento}
          onChange={handle}
          required
        />
      </div>

      <div>
        <label>Residencia:</label>
        <input
          name="residencia"
          type="text"
          value={form.residencia}
          onChange={handle}
          required
        />
      </div>

      <div>
        <label>Sexo:</label>
        <select
          name="sexo"
          value={form.sexo}
          onChange={handle}
          required
        >
          <option value="">Seleccionar…</option>
          <option value="F">F</option>
          <option value="M">M</option>
          <option value="X">X</option>
        </select>
      </div>

      <div>
        <label>Candidato:</label>
        <select
          name="candidato"
          value={form.candidato}
          onChange={handle}
          required
        >
          <option value="">Seleccionar…</option>
          {candidatos.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <button>Votar</button>
    </form>
  );
}
