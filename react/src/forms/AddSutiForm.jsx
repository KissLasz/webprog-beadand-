import React, { useState } from "react";

const AddSutiForm = ({ addSuti }) => {
  const [suti, setSuti] = useState({
    nev: "",
    tipus: "",
    dijazott: "Nem"
  });

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

        addSuti({
          ...suti,
          nev: suti.nev.trim(),
          tipus: suti.tipus.trim()
        });

        setSuti({
          nev: "",
          tipus: "",
          dijazott: "Nem"
        });
      }}
    >
      <label>Név</label>
      <input
        type="text"
        name="nev"
        value={suti.nev}
        onChange={handleInputChange}
        placeholder="pl. Rigójancsi"
      />

      <label>Típus</label>
      <input
        type="text"
        name="tipus"
        value={suti.tipus}
        onChange={handleInputChange}
        placeholder="pl. Csokoládés sütemény"
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

      <button type="submit" className="btn btn-primary">
        Új süti hozzáadása
      </button>
    </form>
  );
};

export default AddSutiForm;