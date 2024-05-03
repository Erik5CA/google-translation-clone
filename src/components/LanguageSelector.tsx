import { Form } from "react-bootstrap";
import { AUTO_LANGUAGE, SUPORTED_LANGUAGES } from "../constants";
import { FromLanguage, Language, SectionType } from "../type.d";

type Props =
  | {
      type: SectionType.From;
      value: FromLanguage;
      onChange: (language: Language) => void;
    }
  | {
      type: SectionType.To;
      value: Language;
      onChange: (language: Language) => void;
    };

function LanguageSelector({ onChange, value, type }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };
  return (
    <Form.Select
      aria-label="Selecciona el idioma"
      onChange={handleChange}
      value={value}
      className="bg-dark text-white"
    >
      {type === SectionType.From && (
        <option value={AUTO_LANGUAGE}>Detectar Idioma</option>
      )}
      {Object.entries(SUPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
}

export default LanguageSelector;
