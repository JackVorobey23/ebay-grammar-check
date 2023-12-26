import { useState } from "react";
import "./styles.css";
import getUaSpellChecking from "../../helpers/getUaSpellCheking";

const OlxCheck = () => {
  const [fetching, setFetching] = useState(false);
  const [goodsResp, setGoodsResp] = useState([]);
  const [amount, setAmount] = useState(1);
  const [req, setReq] = useState("");
  const [incorrectWords, setIncorrectWords] = useState<string[]>([]);

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
            onChange={(e) => setAmount(Number(e.target.value))}
          ></input>
          <span>{amount}</span>
        </div>
        <button
          className="def-button"
          disabled={fetching}
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
            setGoodsResp(JSON.parse(data));
            setFetching(false);
          }}
        >
          {fetching ? "loading..." : "Get goods"}
        </button>
      </div>
      <div
        style={{
          width: "70%",
          overflow: "auto",
          maxHeight: "100%",
        }}
      >
        <p>Goods:</p>
        {goodsResp.map((r: string, i) => (
          <div
            key={i}
            className="d-flex spelling-container justify-content-between"
          >
            <div className="d-flex flex-wrap">
              <div>{i + 1}.</div>
              {r
                .split(/[` !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)
                .map((w: string) => (
                  <div
                    className={`${
                      incorrectWords.includes(w) ? "incorrectText" : ""
                    }`}
                  >
                    {w}
                  </div>
                ))}
            </div>
            <button
              onClick={async () => {
                setFetching(true);
                const concrIncorrectWords = await getUaSpellChecking(
                  goodsResp[i]
                );

                setIncorrectWords((incWords) =>
                  incWords.concat(concrIncorrectWords)
                );
                setFetching(false);
              }}
              disabled={fetching}
              className="def-button align-self-center"
            >
              check spelling
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OlxCheck;
