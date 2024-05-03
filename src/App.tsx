import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStore } from "./hooks/useStore";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import { AUTO_LANGUAGE } from "./constants";
import { ArrowsIcon } from "./components/Icons";
import LanguageSelector from "./components/LanguageSelector";
import { SectionType } from "./type.d";
import TextArea from "./components/TextArea";
import { translate } from "./services/translate";
import { useEffect } from "react";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const handleTranslate = async (textToTranslate: string) => {
    const traduction = await translate({
      fromLanguage,
      toLanguage,
      textToTranslate,
    });
    changeResult(traduction);
  };

  const {
    fromLanguage,
    toLanguage,
    text,
    result,
    loading,
    interchangeLanguages,
    changeFromLanguage,
    changeToLanguage,
    changeText,
    changeResult,
  } = useStore();

  const debounceText = useDebounce(text, 300);

  useEffect(() => {
    if (debounceText === "") return;
    handleTranslate(debounceText);
  }, [debounceText, toLanguage, fromLanguage]);

  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={changeFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={text}
              onChange={changeText}
            />
          </Stack>
        </Col>

        <Col xs="auto">
          <Button
            variant="outline-primary"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={changeToLanguage}
            />
            <TextArea
              type={SectionType.To}
              value={result}
              onChange={changeResult}
              loading={loading}
            />
          </Stack>
        </Col>
      </Row>
      {/* <Button onClick={() => handleTranslate(debounceText)}>
        Translate
      </Button> */}
    </Container>
  );
}

export default App;
