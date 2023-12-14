
export interface TextCorrectionProps {
    original_text: string;
    wordBooleanMap: WordBooleanMap;
}

export interface Correction {
    text: string;
    best_candidate: string;
    candidates: string[];
}

export interface WordBooleanMap {
    [key: string]: boolean;
}