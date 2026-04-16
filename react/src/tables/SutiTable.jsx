import React from "react";

const SutiTable = ({ sutik, editRow, deleteSuti }) => (
  <div className="table-wrapper">
    <table className="crud-table">
      <thead>
        <tr>
          <th>Név</th>
          <th>Típus</th>
          <th>Díjazott</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        {sutik.length > 0 ? (
          sutik.map((suti) => (
            <tr key={suti.id}>
              <td>{suti.nev}</td>
              <td>{suti.tipus}</td>
              <td>
                <span className={suti.dijazott === "Igen" ? "badge badge-yes" : "badge badge-no"}>
                  {suti.dijazott}
                </span>
              </td>
              <td className="actions-cell">
                <button
                  className="btn btn-edit"
                  onClick={() => editRow(suti)}
                >
                  Szerkesztés
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteSuti(suti.id)}
                >
                  Törlés
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="no-data">
              Nincs adat a táblázatban.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default SutiTable;