import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Center, Input, Textarea, Select, Button } from '@mantine/core';

export const Translate = () => {
    const [inputText, setInputText] = useState('');
    
    return (
        <div>
            
            <form>
            <Textarea
            placeholder="Type something to translate"
            size="lg"
            required
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