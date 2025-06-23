import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Generating your blog content...' 
}) => {
  const loadingMessages = [
    'Researching the topic...',
    'Organizing ideas...',
    'Crafting engaging content...',
    'Adding professional insights...',
    'Polishing the final draft...'
  ];

  return (
    <div className="spinner">
      <div className="spinner-circle"></div>
      <p style={{ marginTop: '1.5rem', fontWeight: 500 }}>{message}</p>
      <div style={{ marginTop: '1rem', textAlign: 'center', color: '#666' }}>
        {loadingMessages.map((msg, index) => (
          <p key={index} style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
            {index < Math.floor(Math.random() * 3) + 2 ? '✓' : '•'} {msg}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner; 