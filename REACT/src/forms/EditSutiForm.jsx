import React, { useState, useEffect } from "react";

const EditSutiForm = (props) => {
  const [suti, setSuti] = useState(props.currentSuti);

  useEffect(() => {
    setSuti(props.currentSuti);
  }, [props.currentSuti]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSuti({
      ...suti,
      [name]: type === "checkbox" ? checked : value
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.updateSuti(suti.id, suti);
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
          id="dijazottEdit"
        />
        <label className="form-check-label" htmlFor="dijazottEdit">
          Díjazott
        </label>
      </div>

      <button className="btn btn-primary me-2">Mentés</button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => props.setEditing(false)}
      >
        Mégse
      </button>
    </form>
  );
};

export default EditSutiForm;