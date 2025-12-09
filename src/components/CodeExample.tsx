import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { feature } from 'stateurl'

export default function CodeExample({
    code,
    language = 'typescript',
}: {
    code: string
    language?: string
}) {
    const [copied, setCopied] = useState(false)
    const theme = feature.theme.value

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
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

    // Dark theme with lighter text
    const darkStyle = {
        ...vscDarkPlus,
        comment: {
            color: '#7c7c7c',
            fontStyle: 'italic',
        },
    }

    const customStyle = theme === 'dark' ? darkStyle : lightStyle

    return (
        <div className='code-example'>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                }}
            >
                <h4
                    style={{
                        margin: 0,
                        fontSize: '0.929rem',
                        fontWeight: 500,
                    }}
                >
                    Code Example
                </h4>
                <button
                    type='button'
                    onClick={handleCopy}
                    className='btn btn-primary'
                    style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.929rem',
                        flex: 'none',
                    }}
                >
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                <SyntaxHighlighter
                    language={language}
                    style={customStyle}
                    customStyle={{
                        borderRadius: '6px',
                        padding: '1rem',
                        fontSize: '0.875rem',
                        margin: 0,
                        background: theme === 'dark' ? '#1e1e1e' : '#f6f8fa',
                        fontFamily:
                            "'Roboto Mono', 'SF Mono', Monaco, Consolas, monospace",
                        lineHeight: '1.5',
                        border:
                            theme === 'dark'
                                ? '1px solid #333'
                                : '1px solid #e1e4e8',
                        overflowX: 'visible',
                        width: 'fit-content',
                        minWidth: '100%',
                    }}
                    showLineNumbers={true}
                    wrapLongLines={false}
                    lineNumberStyle={{
                        minWidth: '2.5em',
                        paddingRight: '1em',
                        color: theme === 'dark' ? '#858585' : '#d1d5db',
                        userSelect: 'none',
                        fontSize: '0.875rem',
                        opacity: theme === 'dark' ? 0.6 : 0.5,
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}
