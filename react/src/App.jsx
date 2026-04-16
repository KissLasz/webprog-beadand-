import React, { useState } from "react";
import SutiTable from "./tables/SutiTable";
import EditSutiForm from "./forms/EditSutiForm";
import AddSutiForm from "./forms/AddSutiForm";

const App = () => {
  const sutikData = [
    { id: 1, nev: "Dobos torta", tipus: "Torta", dijazott: "Igen" },
    { id: 2, nev: "Isler", tipus: "Aprósütemény", dijazott: "Nem" },
    { id: 3, nev: "Képviselőfánk", tipus: "Krémes sütemény", dijazott: "Igen" }
  ];

  const emptySuti = { id: null, nev: "", tipus: "", dijazott: "Nem" };

  const [sutik, setSutik] = useState(sutikData);
  const [editing, setEditing] = useState(false);
  const [currentSuti, setCurrentSuti] = useState(emptySuti);
  const [message, setMessage] = useState("");

  const addSuti = (suti) => {
    const newSuti = {
      ...suti,
      id: sutik.length > 0 ? Math.max(...sutik.map((x) => x.id)) + 1 : 1
    };
    setSutik([...sutik, newSuti]);
    setMessage(`Új süti felvéve: ${newSuti.nev}`);
  };

  const deleteSuti = (id) => {
    const sutiToDelete = sutik.find((suti) => suti.id === id);

    if (window.confirm(`Biztosan törlöd ezt a sütit?\n\n${sutiToDelete?.nev || ""}`)) {
      setEditing(false);
      setSutik(sutik.filter((suti) => suti.id !== id));
      setMessage(`Törölve: ${sutiToDelete?.nev || "rekord"}`);
    }
  };

  const editRow = (suti) => {
    setEditing(true);
    setCurrentSuti({ ...suti });
    setMessage(`Szerkesztés alatt: ${suti.nev}`);
  };

  const updateSuti = (id, updatedSuti) => {
    if (window.confirm(`Biztosan mented a módosítást?\n\n${updatedSuti.nev}`)) {
      setEditing(false);
      setSutik(sutik.map((suti) => (suti.id === id ? updatedSuti : suti)));
      setMessage(`Módosítva: ${updatedSuti.nev}`);
    }
  };

  const cancelEditing = () => {
    if (window.confirm("Biztosan megszakítod a szerkesztést?")) {
      setEditing(false);
      setCurrentSuti(emptySuti);
      setMessage("Szerkesztés megszakítva.");
    }
  };

  return (
    <div className="app-container">
      <header className="hero">
        <h1>React CRUD alkalmazás</h1>
        <p>Süti nyilvántartás React és useState használatával</p>
      </header>

      {message && <div className="message-box">{message}</div>}

      <div className="main-grid">
        <section className="card">
          <h2>{editing ? "Süti szerkesztése" : "Új süti felvétele"}</h2>

          {!editing ? (
            <AddSutiForm addSuti={addSuti} />
          ) : (
            <EditSutiForm
              currentSuti={currentSuti}
              updateSuti={updateSuti}
              cancelEditing={cancelEditing}
            />
          )}
        </section>

        <section className="card">
          <h2>Sütik listája</h2>
          <SutiTable sutik={sutik} editRow={editRow} deleteSuti={deleteSuti} />
        </section>
      </div>
    </div>
  );
};

export default App;