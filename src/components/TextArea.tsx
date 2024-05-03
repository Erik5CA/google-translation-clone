import { Form } from "react-bootstrap";
import { SectionType } from "../type.d";

interface Props {
  type: SectionType;
  loading?: boolean;
  onChange: (value: string) => void;
  value: string;
}

const CommonStyles = { border: 0, height: "200px" };

const getPlaceholder = ({
  type,
  loading,
}: {
  type: SectionType;
  loading?: boolean;
}) => {
  if (type === SectionType.From) return "Introducir texto";
  if (loading === true) return "Cargando...";
  return "Traducción";
};

function TextArea({ loading, type, value, onChange }: Props) {
  const styles =
    type === SectionType.From
      ? CommonStyles
      : { ...CommonStyles, backgroundColor: "#f5f5f5" };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Control
      as="textarea"
      placeholder={getPlaceholder({ type, loading })}
      autoFocus={type === SectionType.From}
      disabled={type === SectionType.To}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  );
}

export default TextArea;
