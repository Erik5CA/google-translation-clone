import { Col, Row, Container } from "react-bootstrap";

function Prueba() {
  return (
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
          variant="primary"
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
        </Stack>
      </Col>
    </Row>
  );
}

export default Prueba;
