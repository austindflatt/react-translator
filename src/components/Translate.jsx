import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Input, Title, Textarea, Select, Button, Space, Badge, Avatar } from '@mantine/core';

export const Translate = () => {
    const [inputText, setInputText] = useState('');
    const [detectLanguageKey, setdetectLanguageKey] = useState('');
    const [languagesList, setLanguagesList] = useState([])
    const [selectedLanguageKey, setLanguageKey] = useState('')
    const [resultText, setResultText] = useState('');

    const avatar = (
        <Avatar
          alt="Avatar for badge"
          size={24}
          style={{ marginRight: 5 }}
          src="https://austinflatt.com/images/headshot.webp"
        />
      );

    let data = {
        q : inputText,
        source: detectLanguageKey,
        target: selectedLanguageKey
    }
    axios.post(`https://libretranslate.de/translate`, data)
    .then((response) => {
        setResultText(response.data.translatedText)
    })

    const getLanguageSource = () => {
        axios.post(`https://libretranslate.de/detect`, {
            q: inputText
        })
        .then((response) => {
            setdetectLanguageKey(response.data[0].language)
        })
    }
    
    useEffect(() => {
        axios.get(`https://libretranslate.de/languages`)
        .then((response) => {
            setLanguagesList(response.data)
        })
        getLanguageSource()
    }, [inputText])

    const languageKey = (selectedLanguageKey) => {
        setLanguageKey(selectedLanguageKey.target.value)
    }

    const translateText = () => {
        getLanguageSource();
        let data = {
            q : inputText,
            source: detectLanguageKey,
            target: selectedLanguageKey
        }
        axios.post(`https://libretranslate.de/translate`, data)
        .then((response) => {
            setResultText(response.data.translatedText)
        })
    }

    return (
        <div>
            <Container>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Title order={1}>Translator</Title>
            </div>
            <Space h="sm" />
            <form>
            <Textarea
            placeholder="Type something to translate"
            size="lg"
            required
            onChange={(e) => setInputText(e.target.value)}
            />
            <Space h="sm" />
            <select onChange={languageKey}>
            {languagesList.map((language) => {
                return (
            <option value={language.code}>
            {language.name}
            </option>
                )
            })}
            </select>

            {/* <Select
            placeholder="Select a language"
            size="lg"
            data={[
            { value: 'react', label: 'React' },
            ]}
            /> */}
            <Space h="sm" />
            <Textarea
            placeholder="Translation"
            size="lg"
            required
            value={resultText}
            />
            <Space h="sm" />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button color="teal" size="md" onClick={translateText}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-translate" viewBox="0 0 16 16">
            <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z"/>
            <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z"/>
            </svg>
            &nbsp;
            Translate
            </Button>
            </div>
            </form>
            <Space h="lg" />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Badge style={{ paddingLeft: 0 }} size="lg" color="teal" leftSection={avatar}>
            Developed by Austin Flatt
            </Badge>
            </div>
            </Container>
        </div>
    )
}