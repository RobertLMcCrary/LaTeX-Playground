"use client"
import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function Home() {

    const [textInput, setTextInput] = useState<string>('')
    const [fontSize, setFontSize] = useState<number>(2)
    const [linkName, setLinkName] = useState<string>('')

    const handleFontIncrease = () => {
        if (fontSize < 3) {
            setFontSize(fontSize + 1)
        }
        else if (fontSize >= 3) {
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

    //display LaTeX preview on the right
    const renderLatexPreview = (latex: string): string => {
        try {
            const renderedLines = latex.split('\n').map(line =>
                katex.renderToString(line, { throwOnError: false })
            )

            return renderedLines.join('<br>')
        }
        catch (error) {
            console.log("Error: ", error)
            return '';
        }
    }

    //handling file name changes
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLinkName(e.target.value)
    }

    //save to a .tex file
    const generateTexFile = (fileName: string) => {
        const textContent = textInput;

        const blob = new Blob([textContent], { type: 'text/plain' })

        //create download link
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${fileName}.tex`

        //trigger download by clicking on the link
        document.body.appendChild(link)
        link.click()

        //clean up the link element after download
        document.body.removeChild(link)
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* LaTeX Input Section */}
                <div className="w-full md:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4 text-green-400">LaTeX Input</h1>
                    <textarea
                        value={textInput}
                        onChange={handleInputChange}
                        placeholder="Type your LaTeX here..."
                        className={`w-full h-[70vh] p-4 text-${fontSize}xl bg-gray-800 text-green-400 rounded-lg border border-gray-700 focus:outline-none resize-none font-mono`}
                    />
                </div>

                {/* LaTeX Preview Section */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-2xl font-semibold mb-4 text-green-400">LaTeX Preview</h2>
                    <div
                        className={`p-4 bg-gray-800 border border-gray-700 rounded-lg h-[70vh] overflow-y-auto text-${fontSize}xl`}
                        dangerouslySetInnerHTML={{
                            __html: renderLatexPreview(textInput),
                        }}
                    />
                </div>
            </div>

            {/* Settings Section */}
            <div className="flex flex-col items-center md:flex-row justify-around mt-8">
                <div>
                    <h1 className="text-3xl font-bold text-green-400">Settings</h1>
                </div>
                <div className="flex flex-col items-center mt-4 md:mt-0">
                    <h3 className="text-xl">Font Size</h3>
                    <div className="flex gap-2 mt-2">
                        <button onClick={handleFontIncrease} className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-lg text-lg font-bold">
                            +
                        </button>
                        <button onClick={handleFontDecrease} className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-lg text-lg font-bold">
                            -
                        </button>
                        <button onClick={resetFont} className="px-4 py-2 bg-gray-700 hover:bg-green-600 rounded-lg text-lg font-bold">
                            Reset
                        </button>
                    </div>
                    <div className="mt-2 text-lg font-bold">{fontSize}</div>
                </div>
            </div>

            {/* Save Notes Section */}
            <div className="mt-8 text-center">
                <h1 className="text-2xl font-semibold mb-2 text-green-400">Save Your Notes as a File</h1>
                <input
                    value={linkName}
                    placeholder="File Name..."
                    onChange={handleFileChange}
                    className="w-full max-w-md p-2 mb-4 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 focus:outline-none"
                />
                <button onClick={() => generateTexFile(linkName)} className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-lg font-semibold text-gray-100">
                    Create Notes File
                </button>
            </div>
        </div>
    );
}
