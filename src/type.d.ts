import { AUTO_LANGUAGE, SUPORTED_LANGUAGES } from "./constants";

export type Language = keyof typeof SUPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;
export type FromLanguage = Language | AutoLanguage;

export interface State {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
  result: string;
  loading: boolean;
}

export type Actions =
  | { type: "INTERCHANGE_LANGUAGES" }
  | { type: "CHANGE_FROM_LANGUAGE"; payload: FromLanguage }
  | { type: "CHANGE_TO_LANGUAGE"; payload: Language }
  | { type: "CHANGE_TEXT"; payload: string }
  | { type: "CHANGE_RESULT"; payload: string };

export enum SectionType {
  From = "from",
  To = "to",
}
