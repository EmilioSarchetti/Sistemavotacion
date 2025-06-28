import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import VoteForm from "./components/VoteForm";
import Results from "./components/Results";
import "./index.css";

export default function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* ruta pública */}
        <Route
          path="/"
          element={<VoteForm onVoto={() => setRefreshFlag(!refreshFlag)} />}
        />

        {/* ruta “oculta” para el admin */}
        <Route
          path="/admin"
          element={<Results refreshFlag={refreshFlag} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
