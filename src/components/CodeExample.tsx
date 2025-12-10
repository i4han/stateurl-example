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

    // Dark theme with brighter, more readable text
    const darkStyle = {
        ...vscDarkPlus,
        'code[class*="language-"]': {
            color: '#d4d4d4',
        },
        'pre[class*="language-"]': {
            color: '#d4d4d4',
        },
        comment: {
            color: '#6a9955',
            fontStyle: 'italic',
        },
        string: {
            color: '#ce9178',
        },
        keyword: {
            color: '#569cd6',
        },
        function: {
            color: '#dcdcaa',
        },
        operator: {
            color: '#d4d4d4',
        },
    }

    const customStyle = theme === 'dark' ? darkStyle : lightStyle

    return (
        <div className='code-example' style={{ background: theme === 'dark' ? '#171717' : undefined }}>
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
            <div style={{ overflowX: 'auto', maxWidth: '100%', background: theme === 'dark' ? '#1e1e1e' : '#f6f8fa', borderRadius: '6px' }}>
                <SyntaxHighlighter
                    language={language}
                    style={customStyle}
                    customStyle={{
                        borderRadius: '6px',
                        padding: '1rem',
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
                        opacity: theme === 'dark' ? 0.6 : 0.5,
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}
