// src/App.jsx
import { useState } from "react";
import VoteForm from "./components/VoteForm";
import Results from "./components/Results";
import "./index.css";

export default function App() {
  const [flag, setFlag] = useState(false); // simple toggle para refrescar hijos

  return (
    <div className="container">
      <h1>Sistema de Votación</h1>
      <VoteForm onVoto={() => setFlag(!flag)} />
      <Results refreshFlag={flag} />
    </div>
  );
}
