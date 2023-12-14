import { useState } from "react";
import getSpellChecking from "../../helpers/getSpellChecking";
import "./styles.css";
import TextCorrection from "../TextCorrection";
import { TextCorrectionProps } from "../../interfaces/TextCorrection";
import getUaSpellChecking from "../../helpers/getUaSpellCheking";

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
        onClick={async () => {
          if (inputText === "") {
            return;
          }
          const res = await getUaSpellChecking(inputText);
          console.log(res);
        }}
      >
        Check ua text
      </button>
      <button
        className="def-button"
        onClick={() => {
          if (inputText === "") {
            return;
          }
          getSpellChecking(inputText)
            .then((r: TextCorrectionProps) => setGrammarResult(r))
            .catch(() => setGrammarResult(null));
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
