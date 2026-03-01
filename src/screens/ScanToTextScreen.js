import React, { useState } from 'react';
import { summarizeText } from '../api/gemini';
import Theme from '../constants/Theme';

const ScanToTextScreen = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDyslexicMode, setIsDyslexicMode] = useState(false);

  const handleSimplify = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    const result = await summarizeText(input);
    // Remove any leftover bullet characters or asterisks from the AI
    const cleanResult = result.map(line => line.replace(/[*•-]/g, "").trim());
    setOutput(cleanResult);
    setIsLoading(false);
  };

  const dyslexicProfile = {
    fontFamily: 'OpenDyslexic, sans-serif',
    lineHeight: '1.6',
    letterSpacing: '0.18em',
    wordSpacing: '0.4em',
    fontSize: '18pt',
    textAlign: 'left',
    maxWidth: '65ch',
    transition: 'all 0.3s ease'
  };

  const standardProfile = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
    lineHeight: '1.4',
    letterSpacing: 'normal',
    wordSpacing: 'normal',
    fontSize: '17px',
    textAlign: 'left',
    maxWidth: '100%',
    transition: 'all 0.3s ease'
  };

  const currentStyle = isDyslexicMode ? dyslexicProfile : standardProfile;

  return (
    <div style={{ 
      backgroundColor: Theme.colors.background, 
      minHeight: '100vh', 
      padding: '24px 20px', 
      color: Theme.colors.text 
    }}>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px', paddingTop: '20px' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '12px 28px',
          borderRadius: '40px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          border: '1px solid #e1ded7',
          display: 'inline-block'
        }}>
          <h1 style={{ 
            fontSize: isDyslexicMode ? '22px' : '26px', 
            fontWeight: '700', 
            letterSpacing: isDyslexicMode ? '0.05em' : '-0.5px', 
            margin: 0,
            textAlign: 'center',
            fontFamily: currentStyle.fontFamily,
            color: Theme.colors.text
          }}>
            How will you clarify today?
          </h1>
        </div>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '16px', border: '1px solid #e1ded7', marginBottom: '20px' }}>
        <textarea 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text here..."
          style={{ 
            width: '100%', height: '150px', border: 'none', outline: 'none', resize: 'none',
            color: Theme.colors.text,
            ...currentStyle 
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button 
          onClick={() => setIsDyslexicMode(!isDyslexicMode)}
          style={{
            flex: 1,
            backgroundColor: isDyslexicMode ? '#FEF9C3' : '#E9E9EB',
            color: '#3a3a3a',
            border: '1px solid #e1ded7',
            padding: '16px',
            borderRadius: '40px',
            fontSize: '17px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
          }}
        >
          {isDyslexicMode ? 'Clarify: ON' : 'Clarify Font'}
        </button>

        <button 
          onClick={handleSimplify}
          disabled={isLoading}
          style={{ 
            flex: 1,
            backgroundColor: '#d4e4f7', // Your specific Accent Blue
            color: '#3a3a3a',
            border: '1px solid #e1ded7', 
            padding: '16px', 
            borderRadius: '40px',
            fontSize: '17px', 
            fontWeight: '600', 
            cursor: 'pointer', 
            opacity: isLoading ? 0.6 : 1,
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
          }}
        >
          {isLoading ? 'Simplifying...' : 'Simplify Section'}
        </button>
      </div>

      {output.length > 0 && (
        <div style={{ marginTop: '32px' }}>
          <h2 style={{ 
            fontSize: '13px', 
            color: '#8e8e93', 
            textTransform: 'uppercase', 
            fontWeight: '600', 
            marginBottom: '12px', 
            textAlign: 'center',
            fontFamily: currentStyle.fontFamily,
            letterSpacing: isDyslexicMode ? '0.05em' : 'normal'
          }}>
            Results
          </h2>
          <div style={{ 
            backgroundColor: '#FFFFFF', borderRadius: '14px', border: '1px solid #e1ded7', padding: '24px',
            ...currentStyle 
          }}>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {output.map((line, i) => (
                <li key={i} style={{ 
                  marginBottom: '20px', 
                  listStyleType: 'disc' // Standard iOS bullet point style
                }}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanToTextScreen;