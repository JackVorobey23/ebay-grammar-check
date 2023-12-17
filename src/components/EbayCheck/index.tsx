import { useState } from "react";
import { getEbayGoods, getSpellChecking } from "../../helpers/getSpellChecking";
import "./styles.css";
import { TextCorrectionProps } from "../../interfaces/TextCorrection";
import TextCorrection from "../TextCorrection";
const EbayCheck = () => {
  const [goodsSearch, setGoodsSearch] = useState<string>("");
  const [goodsAmount, setGoodsAmount] = useState<number>(0);
  const [goods, setGoods] = useState<string[] | null>(null);
  const [textCorrection, setTextCorrection] =
    useState<TextCorrectionProps | null>(null);
  return (
    <div className="card">
      <div>
        <input
          type="number"
          onChange={(e) => {
            setGoodsAmount(Number(e.target.value));
          }}
          placeholder={"goods amount"}
        ></input>
        <input
          onChange={(e) => setGoodsSearch(e.target.value)}
          placeholder={'Search (e. g. "car")'}
        ></input>
        <button
          className="def-button ms-3 mb-1"
          disabled={goodsAmount === 0 || goodsSearch === ""}
          onClick={async () => {
            setTextCorrection(null);
            setGoods(null);
            setGoods(await getEbayGoods(goodsSearch, goodsAmount));
          }}
        >
          get goods
        </button>
      </div>
      <div
        style={{
          height: "85%",
          justifyContent: "center",
          display: "flex",
          overflow: "auto",
        }}
      >
        {textCorrection ? (
          <TextCorrection {...textCorrection}></TextCorrection>
        ) : goods ? (
          <div className="overflow-auto">
            {goods?.map((g, i) => (
              <div key={`div-${i}`}>
                {i + 1}. {g}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        <button
          style={{ bottom: 10, position: "absolute" }}
          className="def-button"
          disabled={!goods}
          onClick={async () => {
            const tempGoods = goods!.map((g) => `${g} [[separator]]`);
            const spellChunks = [];

            let chunkSize = 0;
            let tempString = "";

            for (const good of tempGoods) {
              if (chunkSize + good.length > 450) {
                chunkSize = 0;
                spellChunks.push(tempString);
                tempString = good;
                chunkSize = good.length;
              } else {
                tempString += good;
                chunkSize += good.length;
              }
            }
            if (tempString !== "") spellChunks.push(tempString);

            const spellCheckingResponses: TextCorrectionProps[] = [];
            await Promise.all(
              spellChunks.map(async (spellChunk) => {
                const resp = await getSpellChecking(spellChunk);
                return resp as TextCorrectionProps;
              })
            ).then((responses) => spellCheckingResponses.push(...responses));
            const spellCheckingResponse = spellCheckingResponses.reduce(
              (acc, curr) => {
                return {
                  corrections: [...acc.corrections, ...curr.corrections],
                  original_text: `${acc.original_text} ${curr.original_text}`,
                };
              }
            );

            spellCheckingResponse.original_text =
              spellCheckingResponse.original_text
                .split("[[separator]]")
                .map((t: string, i: number) => `${i + 1}. ${t}`)
                .join("");
            setTextCorrection(spellCheckingResponse);
          }}
        >
          Check spelling
        </button>
      </div>
    </div>
  );
};

export default EbayCheck;
