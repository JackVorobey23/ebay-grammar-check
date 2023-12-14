import { useState } from "react";
import "./styles.css";
import getSpellChecking from "../../helpers/getSpellChecking";
import { TextCorrectionProps } from "../../interfaces/TextCorrection";
import TextCorrection from "../TextCorrection";

const EbayCheck = () => {
  const [fetching, setFetching] = useState(false);
  const [resp, setResp] = useState([]);
  const [amount, setAmount] = useState(1);
  const [req, setReq] = useState("");
  const [grammarResult, setGrammarResult] = useState<TextCorrectionProps | null>();

  return (
    <div className="d-flex justify-content-between flex-row card align-items-stretch">
      <div>
        <input onChange={(e) => setReq(e.target.value)}></input>
        <div>
          <p>Set amount of goods: </p>
          <input
            type="range"
            min={1}
            max={5}
            defaultValue={1}
            onChange={(e) => {
              console.log(e.target.value);
              setAmount(Number(e.target.value));
            }}
          ></input>
          <span>{amount}</span>
        </div>
        <button
          className="def-button"
          onClick={async () => {
            setFetching(true);
            const response = await fetch(
              `http://localhost:8080/olx/?reqsrt=${req}&amount=${amount}`,
              {
                mode: "cors",
                method: "POST",
              }
            );
            const data = await response.text();
            setResp(JSON.parse(data));
            console.log(JSON.parse(data));
            setFetching(false);
          }}
        >
          damn
        </button>
      </div>
      <div
        style={{
          width: "70%",
        }}
      >
        {/* <div className="card">
          <button
            className="def-button"
            onClick={() => {
              if (resp.length === 0) {
                return;
              }
              // getSpellChecking(inputText)
              //   .then((r: TextCorrectionProps) => setGrammarResult(r))
              //   .catch(() => setGrammarResult(null));
            }}
          >
            Check text
          </button>
          <div className="checkResult mt-4">
            {grammarResult ? <TextCorrection {...grammarResult} /> : ""}
          </div>
        </div> */}
        <p>Goods:</p>
        {fetching
          ? "loading..."
          : resp.map((r, i) => (
              <p key={i}>
                {i + 1}. {r}
              </p>
            ))}
      </div>
    </div>
  );
};

export default EbayCheck;
