import { useState } from "react";
import getSpellChecking from "./helpers/getSpellChecking";
import "./App.css";

function App() {
  const [grammarResult, setGrammarResult] = useState("");
  const [inputText, setInputText] = useState("");
  return (
    <>
      <h1>Ebay grammar checker</h1>
      <div className="d-flex justify-content-evenly">
        <h2>get text from:</h2>
        <ul className="menu-nav">
          <li>
            <button className="nav-button">Ebay serch</button>
          </li>
          <li>
            <button className="nav-button">From text</button>
          </li>
        </ul>
      </div>
      <div className="card">
        <p>
          text for checking:
          <input onChange={(e) => setInputText(e.target.value)} />
        </p>
        <p>
          {grammarResult == "" ? "\n" : `checking result: ${grammarResult}`}
        </p>
        <button
          className="def-button"
          onClick={() => {
            const result = getSpellChecking(inputText)
              .then((r) => setGrammarResult(r))
              .catch(() => setGrammarResult("nigga"));
            console.log(result);
          }}
        >
          Check text
        </button>
      </div>
    </>
  );
}

export default App;
