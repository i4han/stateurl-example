import { useState } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { feature } from 'stateurl'

export default function CodeExample({
    code,
    language = 'typescript',
    highlightLines = [],
}: {
    code: string
    language?: string
    highlightLines?: number[]
}) {
    useSignals() // Enable signal tracking for reactivity
    const [copied, setCopied] = useState(false)
    const theme = feature.theme

    const handleCopy = async () => {
        try {
            // Modern clipboard API (requires secure context)
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(code)
            } else {
                // Fallback for non-secure contexts
                const textArea = document.createElement('textarea')
                textArea.value = code
                textArea.style.position = 'fixed'
                textArea.style.left = '-9999px'
                document.body.appendChild(textArea)
                textArea.select()
                document.execCommand('copy')
                document.body.removeChild(textArea)
            }
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    // Light theme with readable comments
    const lightStyle = {
        ...vs,
        comment: {
            color: '#6a737d',
            fontStyle: 'italic',
        },
        prolog: {
            color: '#6a737d',
        },
        doctype: {
            color: '#6a737d',
        },
        cdata: {
            color: '#6a737d',
        },
    }

    // Dark theme matching Slate blue palette
    const darkStyle = {
        ...vscDarkPlus,
        'code[class*="language-"]': {
            color: '#e2e8f0',
            background: '#0f172a',
        },
        'pre[class*="language-"]': {
            color: '#e2e8f0',
            background: '#0f172a',
        },
        comment: {
            color: '#64748b',
            fontStyle: 'italic',
        },
        string: {
            color: '#fbbf24',
        },
        keyword: {
            color: '#60a5fa',
        },
        function: {
            color: '#a5b4fc',
        },
        operator: {
            color: '#94a3b8',
        },
        punctuation: {
            color: '#94a3b8',
        },
        number: {
            color: '#34d399',
        },
        boolean: {
            color: '#f472b6',
        },
        'class-name': {
            color: '#67e8f9',
        },
    }

    const customStyle = theme === 'dark' ? darkStyle : lightStyle

    return (
        <div
            className='code-example'
            style={{ background: theme === 'dark' ? '#0f172a' : undefined }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                }}
            >
                <h4 style={{ margin: 0 }}>Code Example</h4>
                <button
                    type='button'
                    onClick={handleCopy}
                    className='btn btn-primary'
                    style={{ flex: 'none' }}
                >
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <div
                style={{
                    overflowX: 'auto',
                    maxWidth: '100%',
                    background: theme === 'dark' ? '#0f172a' : '#f6f8fa',
                    borderRadius: '6px',
                }}
            >
                <SyntaxHighlighter
                    language={language}
                    style={customStyle}
                    customStyle={{
                        borderRadius: '6px',
                        padding: '1rem',
                        margin: 0,
                        background: theme === 'dark' ? '#0f172a' : '#f6f8fa',
                        fontFamily:
                            "'Roboto Mono', 'SF Mono', Monaco, Consolas, monospace",
                        lineHeight: '20px',
                        border:
                            theme === 'dark'
                                ? '1px solid #334155'
                                : '1px solid #e1e4e8',
                        overflowX: 'visible',
                        width: 'fit-content',
                        minWidth: '100%',
                    }}
                    showLineNumbers={true}
                    wrapLines={true}
                    wrapLongLines={false}
                    lineNumberStyle={{
                        minWidth: '2.5em',
                        paddingRight: '1em',
                        color: theme === 'dark' ? '#64748b' : '#d1d5db',
                        userSelect: 'none',
                        opacity: theme === 'dark' ? 0.7 : 0.5,
                    }}
                    lineProps={(lineNumber) => {
                        const isHighlighted =
                            highlightLines.includes(lineNumber)
                        return {
                            style: {
                                display: 'block',
                                backgroundColor: isHighlighted
                                    ? theme === 'dark'
                                        ? 'rgba(59, 130, 246, 0.15)'
                                        : 'rgba(59, 130, 246, 0.12)'
                                    : undefined,
                                borderLeft: isHighlighted
                                    ? '3px solid #3b82f6'
                                    : '3px solid transparent',
                                marginLeft: '-1rem',
                                paddingLeft: 'calc(1rem - 3px)',
                                fontWeight: isHighlighted ? 500 : undefined,
                            },
                        }
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}
