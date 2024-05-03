import { Form } from "react-bootstrap";
import { SectionType } from "../type.d";

interface Props {
  type: SectionType;
  loading?: boolean;
  onChange: (value: string) => void;
  value: string;
}

const CommonStyles = {
  minHeight: "200px",
  height: "max-content",
  width: "100%",
  padding: "20px",
  fontSize: "large",
};

const getPlaceholder = ({
  type,
  loading,
}: {
  type: SectionType;
  loading?: boolean;
}) => {
  if (type === SectionType.From) return "Introducir texto";
  if (loading === true) return "Traduciendo...";
  return "Traducción";
};

function TextArea({ loading, type, value, onChange }: Props) {
  const styles =
    type === SectionType.From
      ? CommonStyles
      : { ...CommonStyles, backgroundColor: "#f5f5f5", border: 0 };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Control
      className="bg-dark text-white"
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
