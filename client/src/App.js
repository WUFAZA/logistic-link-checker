import { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');

  const handleCheck = async () => {
    try {
      const response = await axios.post('http://localhost:3001/check-link', { url });
      setResult(response.data.classification);
    } catch (error) {
      setResult('Error checking link');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Link Checker</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        style={{ width: '300px', padding: '10px' }}
      />
      <button onClick={handleCheck} style={{ padding: '10px 20px', marginLeft: '10px' }}>
        Check
      </button>
      <p>Result: {result}</p>
    </div>
  );
}

export default App;

// Note: Ensure that the backend server is running on http://localhost:3001