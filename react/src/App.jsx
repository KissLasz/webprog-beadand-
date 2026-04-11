import React, { useState } from "react";
import SutiTable from "./tables/SutiTable";
import EditSutiForm from "./forms/EditSutiForm";
import AddSutiForm from "./forms/AddSutiForm";

const App = () => {
  const sutikData = [
    { id: 1, nev: "Süni", tipus: "vegyes", dijazott: false },
    { id: 2, nev: "Citrom", tipus: "torta", dijazott: false },
    { id: 3, nev: "Dobos", tipus: "torta", dijazott: false },
    { id: 4, nev: "Rigó Jancsi", tipus: "torta", dijazott: false },
    { id: 5, nev: "Puncs", tipus: "torta", dijazott: false }
  ];

  const [sutik, setSutik] = useState(sutikData);

  const initialFormState = {
    id: null,
    nev: "",
    tipus: "",
    dijazott: false
  };

  const [currentSuti, setCurrentSuti] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  const addSuti = (suti) => {
    suti.id = sutik.length > 0 ? sutik[sutik.length - 1].id + 1 : 1;
    setSutik([...sutik, suti]);
  };

  const deleteSuti = (id) => {
    setEditing(false);
    setSutik(sutik.filter((suti) => suti.id !== id));
  };

  const editRow = (suti) => {
    setEditing(true);
    setCurrentSuti(suti);
  };

  const updateSuti = (id, updatedSuti) => {
    setEditing(false);
    setSutik(sutik.map((suti) => (suti.id === id ? updatedSuti : suti)));
  };

  return (
    <div className="container mt-4">
      <h1>React CRUD - Cukrászda sütik</h1>
      <div className="row mt-4">
        <div className="col-md-4">
          <h2>{editing ? "Süti szerkesztése" : "Új süti hozzáadása"}</h2>
          {editing ? (
            <EditSutiForm
              setEditing={setEditing}
              currentSuti={currentSuti}
              updateSuti={updateSuti}
            />
          ) : (
            <AddSutiForm addSuti={addSuti} />
          )}
        </div>

        <div className="col-md-8">
          <h2>Sütik listája</h2>
          <SutiTable sutik={sutik} editRow={editRow} deleteSuti={deleteSuti} />
        </div>
      </div>
    </div>
  );
};

export default App;