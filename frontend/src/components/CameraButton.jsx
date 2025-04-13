import React, { useState } from 'react';

function CameraButton({ onClick, disabled }) {
  const [isActive, setIsActive] = useState(false);
  
  const handleClick = () => {
    setIsActive(true);
    onClick();
    
    // Reset active state after a short delay
    setTimeout(() => {
      setIsActive(false);
    }, 300);
  };
  
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-label="Upload Image"
      style={{
        width: '38px',
        height: '38px',
        background: isActive ? '#e0e0e0' : 'transparent',
        border: `1px solid ${isActive ? '#3b82f6' : 'black'}`,
        borderRadius: '50%',
        padding: '0',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease-in-out',
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
      }}
    >
      <svg 
        viewBox="0 0 24 24" 
        width="20" 
        height="20" 
        fill="none" 
        stroke={isActive ? '#3b82f6' : '#000'}
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ 
          display: 'block'
        }}
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
        <circle cx="12" cy="13" r="4"></circle>
      </svg>
    </button>
  );
}

export default CameraButton;