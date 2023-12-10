import { useState } from "react";
import getSpellChecking from "../../helpers/getSpellChecking";
import "./styles.css";
import TextCorrection from "../TextCorrection";
import { TextCorrectionProps } from "../../interfaces/TextCorrection";

const TextCheck = () => {
  const [grammarResult, setGrammarResult] =
    useState<TextCorrectionProps | null>();
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
          getSpellChecking(inputText)
            .then((r: TextCorrectionProps) => setGrammarResult(r))
            .catch(() => setGrammarResult(null));
          console.log(grammarResult);
        }}
      >
        Check text
      </button>
      <div className="checkResult mt-4">
        {grammarResult ? <TextCorrection {...grammarResult} /> : ""}
      </div>
    </div>
  );
};

export default TextCheck;
