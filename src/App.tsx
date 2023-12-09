import { useState } from "react";
import getSpellChecking from "./helpers/getSpellChecking";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [grammarResult, setGrammarResult] = useState("");
  const [inputText, setInputText] = useState("");

  console.log(import.meta.env.VITE_SPELL_CHECKER_API_KEY);
  return (
    <>
      <h1>Ebay grammar checker</h1>
      <div className="card">
        <p>
          text for checking:
          <input onChange={(e) => setInputText(e.target.value)} />
        </p>
        <p>{grammarResult == "" ? "\n" : `checking result: ${grammarResult}`}</p>
        <button
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
