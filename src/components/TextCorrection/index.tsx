import "./styles.css";

interface TextCorrectionProps {
  originalText: string;
  corrections: Correction[];
}

interface Correction {
  text: string;
  best_candidate: string;
  candidates: string[];
}

const TextCorrection = () => {
  return (
    <div>
      TextCorrection
      <a href="#" data-toggle="tooltip" title="Some tooltip text!">
        Hover over me
      </a>
      <div className="tooltip bs-tooltip-top" role="tooltip">
        <div className="arrow"></div>
        <div className="tooltip-inner">Some tooltip text!</div>
      </div>
    </div>
  );
};

export default TextCorrection;
