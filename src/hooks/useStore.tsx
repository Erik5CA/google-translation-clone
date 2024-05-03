import { useReducer } from "react";
import { State, Actions, FromLanguage, Language } from "../type";
import { AUTO_LANGUAGE } from "../constants";

const initialState: State = {
  fromLanguage: "auto",
  toLanguage: "en",
  text: "",
  result: "",
  loading: false,
};

function reducer(state: State, action: Actions) {
  const { type } = action;
  switch (type) {
    case "INTERCHANGE_LANGUAGES":
      if (state.fromLanguage === AUTO_LANGUAGE) return state;
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        loading: state.text === "",
        result: "",
      };
    case "CHANGE_FROM_LANGUAGE":
      if (state.fromLanguage === action.payload) return state;
      return {
        ...state,
        fromLanguage: action.payload,
        loading: state.text === "",
        result: "",
      };
    case "CHANGE_TO_LANGUAGE":
      if (state.fromLanguage === action.payload) return state;

      return {
        ...state,
        toLanguage: action.payload,
        loading: state.text === "",
        result: "",
      };
    case "CHANGE_TEXT":
      return {
        ...state,
        loading: action.payload !== "",
        text: action.payload,
        result: "",
      };
    case "CHANGE_RESULT":
      return {
        ...state,
        loading: false,
        result: action.payload,
      };
    default:
      return state;
  }
}

export function useStore() {
  const [{ fromLanguage, loading, result, text, toLanguage }, dispatch] =
    useReducer(reducer, initialState);

  const changeFromLanguage = (language: FromLanguage) => {
    dispatch({ type: "CHANGE_FROM_LANGUAGE", payload: language });
  };

  const changeToLanguage = (language: Language) => {
    dispatch({ type: "CHANGE_TO_LANGUAGE", payload: language });
  };

  const changeText = (text: string) => {
    dispatch({ type: "CHANGE_TEXT", payload: text });
  };

  const changeResult = (result: string) => {
    dispatch({ type: "CHANGE_RESULT", payload: result });
  };

  const interchangeLanguages = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGES" });
  };

  return {
    changeFromLanguage,
    changeToLanguage,
    changeText,
    changeResult,
    interchangeLanguages,
    fromLanguage,
    toLanguage,
    text,
    loading,
    result,
  };
}
