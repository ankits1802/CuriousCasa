import React from 'react';

function SendButton({ isLoading, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      aria-label="Send message"
      style={{
        width: '38px',
        height: '38px',
        background: disabled ? '#e0e0e0' : '#3b82f6',
        border: 'none',
        borderRadius: '50%',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s ease-in-out',
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative', // Added for better positioning
      }}
    >
      {isLoading ? (
        <span className="loading-icon" style={{ display: 'flex' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" strokeLinecap="round" strokeDasharray="15 15" className="rotate" />
          </svg>
        </span>
      ) : (
        <svg 
          viewBox="0 0 24 24" 
          width="23" 
          height="23" 
          fill="none" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ 
            transform: 'translate(-1px, 1px)', // Adjust position for visual centering
            display: 'block' // Ensures proper sizing
          }}
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      )}
    </button>
  );
}

export default SendButton;