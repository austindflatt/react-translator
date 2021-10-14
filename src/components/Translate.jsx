import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Center, Input, Textarea, Select, Button } from '@mantine/core';

export const Translate = () => {
    const [inputText, setInputText] = useState('');

    const getLanguageSource = () => {
        axios.post(`https://libretranslate.de/detect`, {
            q: inputText
        })
        .then((response) => {
            console.log(response.data[0].language)
        })
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

            <Select
            placeholder="Select a language"
            size="lg"
            data={[
            { value: 'english', label: 'English' },
            ]}
            />

            <Textarea
            placeholder="Translation"
            size="lg"
            required
            />

            <Button color="teal" size="md">
            Translate
            </Button>

            </form>
        </div>
    )
}