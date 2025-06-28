// src/components/VoteForm.jsx
import { useState } from "react";
import { votar } from "../utils/api";

// ✏️ Lista de candidatos: agrega o quita nombres aquí
const candidatos = [
  "Candidato Jorge Nadie",
  "Candidato Juan Domingo Perdon",
  "Candidato Voto Blanco",
  "Candidato Elvira Justa",
  "Candidato Sofía Tridente",
  "Candidato Franco del Pueblo"
];

// Estado inicial del formulario
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

  // Maneja cambios de input
  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Envía el voto al backend
  const submit = async (e) => {
    e.preventDefault();
    try {
      await votar({ ...form, edad: +form.edad });
      alert("✅ Voto registrado");
      setForm(initial);   // Limpia el formulario
      onVoto();           // Avisa al componente padre para refrescar
    } catch (err) {
      alert("⚠️ " + err.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Emitir voto</h2>

      {["DNI", "Nombre Completo", "Edad", "Lugar de Nacimiento", "Residencia"].map((campo) => (
        <div key={campo}>
          <label>{campo.toUpperCase()}:</label>
          <input
            name={campo}
            type={campo === "edad" ? "number" : "text"}
            value={form[campo]}
            onChange={handle}
            required
          />
        </div>
      ))}

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
