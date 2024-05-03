import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStore } from "./hooks/useStore";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import { AUTO_LANGUAGE } from "./constants";
import { ArrowsIcon, CopyIcon, SpeakerIcon } from "./components/Icons";
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

  const handleClipboad = () => {
    navigator.clipboard.writeText(result).catch(() => {});
  };

  const handleSpeak = () => {
    const msg = new SpeechSynthesisUtterance(result);
    msg.lang = toLanguage;
    speechSynthesis.speak(msg);
  };

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
            <div style={{ position: "relative" }}>
              <TextArea
                type={SectionType.To}
                value={result}
                onChange={changeResult}
                loading={loading}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  display: "flex",
                }}
              >
                <Button variant="link" onClick={handleClipboad}>
                  <CopyIcon />
                </Button>
                <Button variant="link" onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
