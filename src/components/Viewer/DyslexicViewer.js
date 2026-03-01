import React from 'react';
import { Theme } from '../../constants/Theme';

const DyslexicViewer = ({ text, points, isOptimized }) => {
  const viewerStyle = {
    fontFamily: Theme.typography.fontFamily,
    lineHeight: Theme.typography.lineHeight,
    letterSpacing: Theme.typography.letterSpacing,
    textAlign: 'left', // Crucial for dyslexia focus [cite: 8, 80]
    maxWidth: Theme.typography.maxWidth,
    color: Theme.colors.textPrimary,
    fontSize: '18px', // Large font for accessibility [cite: 12, 85]
    padding: '20px'
  };

  return (
    <div style={viewerStyle}>
      {isOptimized ? (
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          {points.map((point, i) => (
            <li key={i} style={{ marginBottom: '15px' }}>{point}</li> // [cite: 10, 102]
          ))}
        </ul>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
};

export default DyslexicViewer;