// src/components/VoteForm.jsx
import { useState } from "react";
import { votar } from "../utils/api";

const initial = {
  dni: "", nombre: "", edad: "", sexo: "",
  nacimiento: "", residencia: "", candidato: ""
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
      onVoto();               // avisa al padre para refrescar
    } catch (err) {
      alert("⚠️ " + err.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Emitir voto</h2>

      {["dni","nombre","edad","nacimiento","residencia"].map(c => (
        <div key={c}>
          <label>{c.toUpperCase()}:</label>
          <input
            name={c}
            type={c==="edad" ? "number" : "text"}
            value={form[c]}
            onChange={handle}
            required
          />
        </div>
      ))}

      <div>
        <label>Sexo:</label>
        <select name="sexo" value={form.sexo} onChange={handle} required>
          <option value="">Seleccionar…</option>
          <option>F</option><option>M</option><option>X</option>
        </select>
      </div>

      <div>
        <label>Candidato:</label>
        <select name="candidato" value={form.candidato} onChange={handle} required>
          <option value="">Seleccionar…</option>
          <option>Candidato Jorge Nadie</option>
          <option>Candidato Juan Domingo Perdon</option>
          <option>Candidato Voto Blanco</option>
        </select>
      </div>

      <button>Votar</button>
    </form>
  );
}
