import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CodeExample({ code, language = 'typescript' }: { code: string; language?: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Light theme with readable comments
    const customStyle = {
        ...vs,
        'comment': {
            color: '#6a737d',
            fontStyle: 'italic'
        },
        'prolog': {
            color: '#6a737d'
        },
        'doctype': {
            color: '#6a737d'
        },
        'cdata': {
            color: '#6a737d'
        }
    }

    return (
        <div className='code-example'>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '1rem'
            }}>
                <h4 style={{ 
                    margin: 0,
                    fontSize: '1rem',
                    fontWeight: 600
                }}>
                    Code Example
                </h4>
                <button 
                    onClick={handleCopy} 
                    className='btn btn-primary'
                    style={{ 
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        flex: 'none'
                    }}
                >
                    {copied ? '✓ Copied' : 'Copy'}
                </button>
            </div>
            <SyntaxHighlighter 
                language={language} 
                style={customStyle}
                customStyle={{
                    borderRadius: '6px',
                    padding: '1.25rem',
                    fontSize: '0.875rem',
                    margin: 0,
                    background: '#f6f8fa',
                    fontFamily: "'JetBrains Mono', 'SF Mono', Monaco, Consolas, monospace",
                    lineHeight: '1.6',
                    border: '1px solid #e1e4e8'
                }}
                showLineNumbers={true}
                wrapLongLines={false}
                lineNumberStyle={{
                    minWidth: '2.5em',
                    paddingRight: '1em',
                    color: '#959da5',
                    userSelect: 'none',
                    fontSize: '0.875rem'
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}
