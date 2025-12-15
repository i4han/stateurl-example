import { useState } from 'react'
import { feature, handleHref, useSignals } from 'stateurl'

interface HeaderProps {
    to: (path: string) => string
}

export default function Header({ to }: HeaderProps) {
    useSignals()
    const [toast, setToast] = useState<string | null>(null)

    const toggleTheme = () => {
        feature.theme = feature.theme === 'light' ? 'dark' : 'light'
    }

    const toggleVersion = () => {
        feature.version = feature.version === 'v1' ? 'v2' : 'v1'
        setToast(`URL updated to ${feature.version}`)
        setTimeout(() => setToast(null), 2500)
    }

    return (
        <>
            <header className='top-menu'>
                <a href={to('/home')} onClick={handleHref} className='logo'>
                    <span className='logo-icon'>S</span>
                    <span className='logo-text'>StateURL</span>
                </a>
                <nav className='top-nav'>
                    <div className='nav-links'>
                        <a href='https://github.com/i4han/stateurl-example' className='external'>
                            <span>GitHub</span>
                        </a>
                        <a href='https://www.npmjs.com/package/stateurl' className='external'>
                            <span>npm</span>
                        </a>
                        <a href='/docs/'><span>Docs</span></a>
                    </div>
                    <div className='nav-controls'>
                        <button type='button' onClick={toggleVersion} className='control-btn'>
                            {feature.version}
                        </button>
                        <button type='button' onClick={toggleTheme} className='control-btn'>
                            {feature.theme === 'light' ? '☀︎' : '☾'}
                        </button>
                    </div>
                </nav>
            </header>

            {toast && (
                <div
                    style={{
                        position: 'fixed',
                        top: '60px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: feature.theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                        color: feature.theme === 'dark' ? '#93c5fd' : '#1e40af',
                        padding: '8px 20px',
                        borderRadius: '6px',
                        border: '1px solid rgba(59, 130, 246, 0.25)',
                        zIndex: 10000,
                        animation: 'toastFade 0.3s ease-out, toastFadeOut 0.8s ease-in 2.2s',
                        fontWeight: 500,
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    }}
                >
                    {toast}
                    <style>{`
                        @keyframes toastFade {
                            0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
                            100% { opacity: 1; transform: translateX(-50%) translateY(0); }
                        }
                        @keyframes toastFadeOut {
                            0% { opacity: 1; }
                            100% { opacity: 0; }
                        }
                    `}</style>
                </div>
            )}
        </>
    )
}
