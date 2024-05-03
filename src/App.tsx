import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStore } from "./hooks/useStore";
import {
  Container,
  Row,
  Col,
  Button,
  Stack,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { AUTO_LANGUAGE } from "./constants";
import {
  ArrowsIcon,
  CloseIcon,
  CopyIcon,
  SpeakerIcon,
} from "./components/Icons";
import LanguageSelector from "./components/LanguageSelector";
import { SectionType } from "./type.d";
import TextArea from "./components/TextArea";
import { translate } from "./services/translate";
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [show, setShow] = useState(false);
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
    if (debounceText === "" || text === "") return;
    handleTranslate(debounceText);
  }, [debounceText, toLanguage, fromLanguage]);

  const handleClipboad = () => {
    navigator.clipboard.writeText(result).catch(() => {});
    setShow(true);
  };

  const handleSpeak = () => {
    const msg = new SpeechSynthesisUtterance(result);
    msg.lang = toLanguage;
    speechSynthesis.speak(msg);
  };

  const handleClearFromText = () => {
    changeText("");
    // changeResult("");
  };
  return (
    <Container fluid="lg" className="w-100">
      <h2 className="m-3 px-3">Google Translate</h2>

      <ToastContainer position="middle-center" className="mt-4 text-white">
        <Toast
          onClose={() => setShow(false)}
          bg="dark"
          show={show}
          delay={2000}
          autohide
        >
          <Toast.Body>Text Copied</Toast.Body>
        </Toast>
      </ToastContainer>

      <Container className="mb-5">
        <Col>
          <div className="d-flex gap-2 mb-2">
            <Col>
              <LanguageSelector
                type={SectionType.From}
                value={fromLanguage}
                onChange={changeFromLanguage}
              />
            </Col>
            <Col xs="auto">
              <Button
                variant="primary"
                disabled={fromLanguage === AUTO_LANGUAGE}
                onClick={interchangeLanguages}
              >
                <ArrowsIcon />
              </Button>
            </Col>
            <Col>
              <LanguageSelector
                type={SectionType.To}
                value={toLanguage}
                onChange={changeToLanguage}
              />
            </Col>
          </div>
          <Row xs={1} sm={2} md={2} lg={2}>
            <Col>
              <div style={{ position: "relative" }}>
                <TextArea
                  type={SectionType.From}
                  value={text}
                  onChange={changeText}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    display: text === "" ? "none" : "flex",
                  }}
                >
                  <Button
                    variant="link"
                    title="Borrar Texto"
                    onClick={handleClearFromText}
                    disabled={result === ""}
                  >
                    <CloseIcon />
                  </Button>
                </div>
              </div>
            </Col>
            <Col>
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
                    bottom: -35,
                    left: 0,
                    display: "flex",
                    backgroundColor: "rgb(33, 37, 41)",
                    width: "100%",
                    borderRadius: "0 0 5px 5px",
                  }}
                >
                  <Button
                    variant="link"
                    title="Copiar"
                    onClick={handleClipboad}
                    disabled={result === ""}
                  >
                    <CopyIcon />
                  </Button>

                  <Button
                    variant="link"
                    title="Escuchar"
                    disabled={result === ""}
                    onClick={handleSpeak}
                  >
                    <SpeakerIcon />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Container>
    </Container>
  );
}

export default App;
