"use client"
import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';


export default function Home() {

    const [textInput, setTextInput] = useState<string>('')
    const [fontSize, setFontSize] = useState<number>(2)

    const handleFontIncrease = () => {
        if (fontSize < 4) {
            setFontSize(fontSize + 1)
        }
        else if (fontSize >= 4) {
            setFontSize(fontSize)
        }
    }

    const handleFontDecrease = () => {
        if (fontSize > 1) {
            setFontSize(fontSize - 1)
        }
        else if (fontSize <= 1) {
            setFontSize(fontSize)
        }
    }

    const resetFont = () => {
        setFontSize(2)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextInput(e.target.value)
    }

    const renderLatexPreview = (latex: string): string => {
        try {
            const renderedLines = latex.split('\n').map(line =>
                katex.renderToString(line, { throwOnError: false })
            )

            return renderedLines.join('<br>')
        }
        catch (error) {
            return '';
        }
    }

    return (
        <div className='h-[100vh] bg-white'>
            <div className="flex md:flex-row gap-6 p-6 bg-white">
                <div className="w-full md:w-1/2">
                    <h1 className="text-2xl text-black font-semibold mb-2">LaTeX Input</h1>
                    <textarea
                        value={textInput}
                        onChange={handleInputChange}
                        placeholder="Type your LaTeX here"
                        className={`text-green-400 bg-black text-${fontSize}xl w-full h-[70vh] p-2 border border-gray-300 rounded-md font-mono`}
                    />
                </div>
                <div className="w-full md:w-1/2 text-black">
                    <h2 className="text-2xl font-semibold mb-2">LaTeX Preview</h2>
                    <div
                        className={`text-black text-${fontSize}xl border border-gray-300 rounded-md p-2 bg-gray-50 h-[70vh] overflow-y-auto`}
                        dangerouslySetInnerHTML={{
                            __html: renderLatexPreview(textInput),
                        }}
                    />
                </div>
            </div>
            <div className='text-black text-center'>
                <h1 className="text-4xl font-bold">Settings</h1>
                <div>
                    <h3 className="text-2xl">Font Size</h3>
                    <button onClick={() => handleFontIncrease()} className="border p-1 w-8">+</button>
                    <button onClick={() => handleFontDecrease()} className="border p-1 w-8">-</button>
                    <button onClick={() => resetFont()} className='border p-1'>Reset</button>
                    <h3 className="text=2xl">{fontSize}</h3>
                </div>
            </div>
        </div>
    );
}
