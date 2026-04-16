import React, { useState, useEffect } from "react";

const EditSutiForm = ({ currentSuti, updateSuti, cancelEditing }) => {
  const [suti, setSuti] = useState(currentSuti);

  useEffect(() => {
    setSuti(currentSuti);
  }, [currentSuti]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSuti({ ...suti, [name]: value });
  };

  return (
    <form
      className="form-layout"
      onSubmit={(event) => {
        event.preventDefault();

        if (!suti.nev.trim() || !suti.tipus.trim()) {
          alert("A név és a típus megadása kötelező.");
          return;
        }

        updateSuti(suti.id, {
          ...suti,
          nev: suti.nev.trim(),
          tipus: suti.tipus.trim()
        });
      }}
    >
      <label>Név</label>
      <input
        type="text"
        name="nev"
        value={suti.nev}
        onChange={handleInputChange}
      />

      <label>Típus</label>
      <input
        type="text"
        name="tipus"
        value={suti.tipus}
        onChange={handleInputChange}
      />

      <label>Díjazott</label>
      <select
        name="dijazott"
        value={suti.dijazott}
        onChange={handleInputChange}
      >
        <option value="Igen">Igen</option>
        <option value="Nem">Nem</option>
      </select>

      <div className="button-row">
        <button type="submit" className="btn btn-success">
          Módosítás mentése
        </button>

        <button
          type="button"
          className="btn btn-warning"
          onClick={cancelEditing}
        >
          Mégse
        </button>
      </div>
    </form>
  );
};

export default EditSutiForm;