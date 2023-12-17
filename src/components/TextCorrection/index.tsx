import { useState } from "react";
import "./styles.css";
import {
  Correction,
  TextCorrectionProps,
} from "../../interfaces/TextCorrection";

const TextCorrection = (props: TextCorrectionProps) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipPos, setTooltipPos] = useState<[number, number]>([0, 0]);
  const [correction, setCorrection] = useState<Correction | null>();
  const incorrectWords = props.corrections.map((cr) => cr.text);
  const originalText = props.original_text.split(" ");

  return (
    <div>
      <h2>Text Correction:</h2>
      <div
        style={{
          visibility: showTooltip ? "visible" : "hidden",
          position: "fixed",
          left: tooltipPos[0],
          top: tooltipPos[1],
          width: "20vw",
          backgroundColor: "#4c4c58",
          borderRadius: "5px 20px 20px 20px",
          padding: "15px",
        }}
      >
        Best option: <p className="best-option">{correction?.best_candidate}</p>
        Possible candidates:
        <div className="d-flex flex-wrap">
          {correction?.candidates.map((c, i) => (
            <div className="possible-option" key={`pos-op-${i}`}>
              {c}
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex flex-wrap overflow-auto h-75">
        {originalText.map((w, i) =>
          incorrectWords.includes(w) ? (
            <div
              key={`word-${i}`}
              onMouseOver={(e) => {
                setCorrection(props.corrections.find((c) => c.text === w));
                setTooltipPos([e.pageX, e.pageY + 10]);
                setShowTooltip(true);
              }}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={(e) => {
                const element = e.target as HTMLElement;
                if (element.innerText === correction?.text) {
                  element.innerText = correction.best_candidate;
                  element.classList.replace("incorrectText", "correctText");
                } else {
                  element.innerText = correction!.text;
                  element.classList.replace("correctText", "incorrectText");
                }
              }}
              className="incorrectText"
            >
              {w}
            </div>
          ) : (
            <div key={`word-${i}`}>{w}</div>
          )
        )}
      </div>
    </div>
  );
};

export default TextCorrection;
