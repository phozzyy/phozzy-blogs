import { useState } from 'react'
import axios from 'axios'
//import { Content } from 'openai'

export default function NewPost() {
    const [prompt, setPrompt] = useState('')
    const [result, setResult] = useState('')
    const [loading, setLoading] = useState(false)

    const generatePost = async () => {
        setLoading(true)
        try {
            const res = await axios.post('/api/generate', { prompt })
            setResult(res.data.result.trim())
        } catch (error) {
            console.error('Error generating post', error)
            alert('Failed to generate content. Please try again')
        } finally {setLoading(false)
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
            <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full h-24 p-2 border"
            />
            <button
            onClick={generatePost}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
            {loading ? 'Generating...' : 'Generate'}
            </button>
            
            {result && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Generated Content:</h2>
                    <div className="whitespace-pre-line border p-4">{result}</div>
                </div>
            )}
                </div>
            )}
    
            const publishPost = async () => {
                await axios.post('/api/posts', {
                    title: prompt,
                    //content: result,
                })
            }