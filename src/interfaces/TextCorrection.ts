
export interface TextCorrectionProps {
    original_text: string;
    corrections: Correction[];
}

export interface Correction {
    text: string;
    best_candidate: string;
    candidates: string[];
}