import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Center, Input, Textarea, Select, Button } from '@mantine/core';

export const Translate = () => {
    const [inputText, setInputText] = useState('');
    const [detectLanguageKey, setdetectLanguageKey] = useState('');
    const [languagesList, setLanguagesList] = useState([])
    const [selectedLanguageKey, setLanguageKey] = useState('')

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
    }, [])

    const languageKey = () => {
        setLanguageKey(selectedLanguageKey.target.value)
    }

    return (
        <div>
            
            <form>
            <Textarea
            placeholder="Type something to translate"
            size="lg"
            required
            onChange={(e) => setInputText(e.target.value)}
            />

            <select onChange={languageKey}>
            {languagesList.map((language) => {
                return (
            <option value={language.code}>{language.name}</option>
                )
            })}
            </select>

            {/* <Select
            placeholder="Select a language"
            size="lg"
            data={[
            { value: 'react', label: 'React' },
            { value: 'ng', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'vue', label: 'Vue' },
            ]}
            /> */}

            <Textarea
            placeholder="Translation"
            size="lg"
            required
            />

            <Button color="teal" size="md" onClick={getLanguageSource}>
            Translate
            </Button>

            </form>
        </div>
    )
}