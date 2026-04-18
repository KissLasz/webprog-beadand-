import { useState } from "react";
import "./App.css";
import Board from "./components/Board";

function Calculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState("");

  const n1 = Number(a) || 0;
  const n2 = Number(b) || 0;

  return (
    <div>
      <h2>Calculator</h2>

      <input
        type="number"
        placeholder="Első szám"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <input
        type="number"
        placeholder="Második szám"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />

      <div className="calc-buttons">
        <button onClick={() => setResult(n1 + n2)}>+</button>
        <button onClick={() => setResult(n1 - n2)}>-</button>
        <button onClick={() => setResult(n1 * n2)}>*</button>
        <button onClick={() => setResult(n2 !== 0 ? n1 / n2 : "Nullával nem lehet osztani")}>/</button>
      </div>

      <p><strong>Eredmény:</strong> {result}</p>
    </div>
  );
}

function TicTacToe() {
  return (
    <div>
      <h2>Tic-Tac-Toe</h2>
      <Board />
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("calculator");

  return (
    <div className="spa-container">
      <h1>SPA alkalmazás</h1>

      <div className="menu-buttons">
        <button onClick={() => setActivePage("calculator")}>Calculator</button>
        <button onClick={() => setActivePage("tictactoe")}>Tic-Tac-Toe</button>
      </div>

      <div className="content-box">
        {activePage === "calculator" && <Calculator />}
        {activePage === "tictactoe" && <TicTacToe />}
      </div>
    </div>
  );
}