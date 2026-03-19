import { useState } from 'react'

function App() {
    const [testResponse, setTestResponse] = useState(null)
    const [timeResponse, setTimeResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

    const testBackend = async () => {
        setIsLoading(true)
        try {
            const resp = await fetch(`${apiUrl}/api/test`)
            const data = await resp.json()
            setTestResponse(data)
        } catch (err) {
            setTestResponse({ error: err.message })
        } finally {
            setIsLoading(false)
        }
    }

    const checkDatabase = async () => {
        setIsLoading(true)
        try {
            const resp = await fetch(`${apiUrl}/api/time`)
            const data = await resp.json()
            setTimeResponse(data)
        } catch (err) {
            setTimeResponse({ error: err.message })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Deployment MVP</h1>
            <p>Backend API URL: <code>{apiUrl}</code></p>

            <div style={{ marginBottom: '20px' }}>
                <button onClick={testBackend} disabled={isLoading}>
                    Test Backend
                </button>
                {testResponse && (
                    <pre style={{ backgroundColor: '#f4f4f4', padding: '10px' }}>
                        {JSON.stringify(testResponse, null, 2)}
                    </pre>
                )}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <button onClick={checkDatabase} disabled={isLoading}>
                    Check Database
                </button>
                {timeResponse && (
                    <div style={{ marginTop: '10px' }}>
                        <strong>Database Time:</strong>
                        <pre style={{ backgroundColor: '#f4f4f4', padding: '10px' }}>
                            {JSON.stringify(timeResponse, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
