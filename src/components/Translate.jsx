import React from 'react'
import { Center, Input, Textarea, Select, Button } from '@mantine/core';

export const Translate = () => {
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