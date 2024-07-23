import { useEffect } from 'react'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

function App () {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      }).catch(() => {
        setResult('Error')
      })
  }, [fromLanguage, toLanguage, debouncedFromText])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    // es parte del navegador, y le podes pasar un texto para que lo diga
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = toLanguage
    utterance.rate = 1 // velocidad con la que habla
    speechSynthesis.speak(utterance)
  }

  return (
    <>
      <Container fluid>
        <Stack gap={2}>
          <h2>Google translate</h2>
          <Row>
            <Col>
              <Stack gap={2}>
                <LanguageSelector
                  type={SectionType.From}
                  value={fromLanguage}
                  onChange={setFromLanguage}
                />
                <TextArea
                  type={SectionType.From}
                  value={fromText}
                  onChange={setFromText}
                />
              </Stack>
            </Col>
            <Col xs='auto'>
              <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
                <ArrowsIcon />
              </Button>
            </Col>
            <Col>
              <Stack gap={2}>
                <LanguageSelector
                  type={SectionType.To}
                  value={toLanguage}
                  onChange={setToLanguage}
                />
                <div style={{ position: 'relative' }}>
                  <TextArea
                    type={SectionType.To}
                    loading={loading}
                    value={result}
                    onChange={setResult}
                  />
                  <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                    <Button
                      variant='link'
                      onClick={handleClipboard}
                    >
                      <ClipboardIcon />
                    </Button>
                    <Button
                      variant='link'
                      onClick={handleSpeak}
                    >
                      <SpeakerIcon />
                    </Button>
                  </div>
                </div>
              </Stack>
            </Col>
          </Row>
        </Stack>
      </Container>
    </>
  )
}

export default App
