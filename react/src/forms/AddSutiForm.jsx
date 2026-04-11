import React, { useState } from "react";

const AddSutiForm = (props) => {
  const initialFormState = {
    id: null,
    nev: "",
    tipus: "",
    dijazott: false
  };

  const [suti, setSuti] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSuti({
      ...suti,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const resetForm = () => {
    setSuti(initialFormState);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!suti.nev || !suti.tipus) return;
        props.addSuti(suti);
        resetForm();
      }}
    >
      <label>Név</label>
      <input
        type="text"
        name="nev"
        value={suti.nev}
        onChange={handleInputChange}
        className="form-control mb-2"
      />

      <label>Típus</label>
      <input
        type="text"
        name="tipus"
        value={suti.tipus}
        onChange={handleInputChange}
        className="form-control mb-2"
      />

      <div className="form-check mb-3">
        <input
          type="checkbox"
          name="dijazott"
          checked={suti.dijazott}
          onChange={handleInputChange}
          className="form-check-input"
          id="dijazottAdd"
        />
        <label className="form-check-label" htmlFor="dijazottAdd">
          Díjazott
        </label>
      </div>

      <button className="btn btn-success">Hozzáadás</button>
    </form>
  );
};

export default AddSutiForm;