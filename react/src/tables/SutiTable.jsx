import React from "react";

const SutiTable = (props) => (
  <table className="table table-striped table-bordered">
    <thead>
      <tr>
        <th>Név</th>
        <th>Típus</th>
        <th>Díjazott</th>
        <th>Műveletek</th>
      </tr>
    </thead>
    <tbody>
      {props.sutik.length > 0 ? (
        props.sutik.map((suti) => (
          <tr key={suti.id}>
            <td>{suti.nev}</td>
            <td>{suti.tipus}</td>
            <td>{suti.dijazott ? "Igen" : "Nem"}</td>
            <td>
              <button onClick={() => props.editRow(suti)}>
                Módosítás
              </button>
              <button onClick={() => props.deleteSuti(suti.id)}>
                Törlés
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4">Nincs süti</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default SutiTable;