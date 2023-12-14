import "./styles.css";
import { TextCorrectionProps } from "../../interfaces/TextCorrection";

const TextCorrection = (props: TextCorrectionProps) => {
  const incorrectWords = Object.keys(props.wordBooleanMap)
    .map((word) => {
      if (!props.wordBooleanMap[word]) {
        return word;
      }
    })
    .filter((a) => a);
  const originalText = props.original_text.split(" ");

  return (
    <div className="d-flex flex-wrap">
      {originalText.map((w, i) =>
        incorrectWords.includes(w) ? (
          <div key={`word-${i}`} className="incorrectText">
            {w}
          </div>
        ) : (
          <div key={`word-${i}`}>{w}</div>
        )
      )}
    </div>
  );
};

export default TextCorrection;
