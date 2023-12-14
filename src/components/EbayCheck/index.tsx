import { useState } from "react";
import "./styles.css";

const EbayCheck = () => {
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
            onChange={(e) => {
              console.log(e.target.value);
              setAmount(Number(e.target.value));
            }}
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
            console.log(JSON.parse(data));
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
            <p>
              {i + 1}.{" "}
              {r
                .split("")
                .map((w: string) =>
                  incorrectWords.includes(w) ? <div></div> : <p></p>
                )}
            </p>
            <button
              onClick={() => {
                goodsResp[i];
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

export default EbayCheck;
