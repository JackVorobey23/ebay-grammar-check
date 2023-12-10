import { useState } from "react";
import getSpellChecking from "../../helpers/getSpellChecking";
import "./styles.css";
import TextCorrection from "../TextCorrection";
const TextCheck = () => {
  const [grammarResult, setGrammarResult] = useState("");
  const [inputText, setInputText] = useState("");
  return (
    <div className="card">
      <p>
        text for checking:
        <input onChange={(e) => setInputText(e.target.value)} />
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
      <div className="checkResult mt-4">
        <TextCorrection />
        <p>
          {grammarResult == "" ? "\n" : `checking result: ${grammarResult}`}
        </p>
      </div>
    </div>
  );
};

export default TextCheck;
