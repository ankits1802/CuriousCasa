import { useState, useEffect, useRef } from 'react';
import './App.css';
import SendButton from './components/SendButton';
import ImageAnalysisAgent from './components/ImageAnalysisAgent';
import FaqAgent from './components/FaqAgent';
import DiagnoseAgent from './components/DiagnoseAgent';
import ChatHistory from './components/ChatHistory';
import CameraButton from './components/CameraButton';

const faqKeywords = [
  "rent", "eviction", "landlord", "lease", "contract", "deposit", "agreement", "notice",
  "tenancy", "legal", "termination", "rights", "tenant", "law", "court", "lawsuit", "sublet"
];

const diagnoseKeywords = [
  "leak", "pipe", "broken", "repair", "fix", "damaged", "fan", "ac", "bulb", "electrical", "plumbing", 
  "clogged", "heater", "drain", "crack", "roof", "wall", "mold", "floor", "window", "door", "noise", 
  "water", "smoke", "gas", "leaking", "flood", "fault", "vent", "air-conditioning"
];

function App() {
  const [activeAgent, setActiveAgent] = useState('auto');
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const fileInputRef = useRef(null);
  
  
  const detectAgentType = (text, hasImage) => {
    if (hasImage) return 'image';
    
    // Convert text to lowercase for case-insensitive matching
    const lowercaseText = text.toLowerCase();
    
    // Check for FAQ keywords
    for (const keyword of faqKeywords) {
      if (lowercaseText.includes(keyword.toLowerCase())) {
        return 'faq';
      }
    }
    
    // Check for diagnose keywords
    for (const keyword of diagnoseKeywords) {
      if (lowercaseText.includes(keyword.toLowerCase())) {
        return 'diagnose';
      }
    }
    
    // Default to diagnose if no keywords match
    return 'diagnose';
  };

  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedImage(file);
    
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    // If image is uploaded, automatically switch to image agent
    if (activeAgent === 'auto') {
      setActiveAgent('image');
    }
  };
  
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!inputText.trim() && !selectedImage) || isLoading) return;
    
    setIsLoading(true);
    
    let agentToUse = activeAgent;
    if (agentToUse === 'auto') {
      agentToUse = detectAgentType(inputText, !!selectedImage);
    }
    
    // If there's an image selected but the agent isn't the image agent, 
    // force use of image agent
    if (selectedImage && agentToUse !== 'image') {
      agentToUse = 'image';
    }
    
    // Add user message to chat history
    const userMessage = {
      role: 'user',
      text: inputText,
      image: imagePreview,
      timestamp: new Date().toISOString(),
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    
    try {
      let response;
      
      // eslint-disable-next-line default-case
      switch (agentToUse) {
        case 'image': {
          const formData = new FormData();
          formData.append('file', selectedImage);
          formData.append('prompt', inputText || 'Analyze this image');
          
          const res = await fetch('http://127.0.0.1:8001/analyze-image/', {
            method: 'POST',
            body: formData,
          });
          response = await res.json();
          console.log(response);
          break;
        }
        
        case 'faq': {
          const formData = new FormData();
          formData.append('question', inputText);
          const res = await fetch('http://127.0.0.1:8002/faq/', {
            method: 'POST',
            body: formData,
          });
          response = await res.json();
          console.log(response);
          break;
        }
        
        case 'diagnose': {
          const formData = new FormData();
          formData.append('problem', inputText);
          
          const res = await fetch('http://127.0.0.1:8003/diagnose/', {
            method: 'POST',
            body: formData,
          });
          response = await res.json();
          break;
        }
      }
      
      // Add bot response to chat history
      const botMessage = {
        role: 'bot',
        // text: response.result || response.answer || response.solution || response.message || 'No response from agent',
        text: response || 'No response from agent',
        agentType: agentToUse,
        timestamp: new Date().toISOString(),
      };
      
      setChatHistory(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      // Add error message to chat history
      const errorMessage = {
        role: 'bot',
        text: 'Sorry, there was an error processing your request. Please try again.',
        agentType: agentToUse,
        error: true,
        timestamp: new Date().toISOString(),
      };
      
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setInputText('');
      removeImage();
    }
  };
  
  return (
    <div className="app-container">
      <header>
        <div className="logo-and-title">
          <div className="logo-container">
          <img src="/logo.png" alt="CuriousCasa Logo" className="logo" />
          </div>
          <div className="title-container">
          <h1 id="titleId">CuriousCasa</h1>
          </div>
        </div>
        <div className="agent-toggle">
          <button 
            className={`agent-btn ${activeAgent === 'auto' ? 'active' : ''}`} 
            onClick={() => setActiveAgent('auto')}
          >
            Auto Detect
          </button>
          <button 
            className={`agent-btn ${activeAgent === 'image' ? 'active' : ''}`} 
            onClick={() => setActiveAgent('image')}
          >
            Image Analysis
          </button>
          <button 
            className={`agent-btn ${activeAgent === 'faq' ? 'active' : ''}`} 
            onClick={() => setActiveAgent('faq')}
          >
            Tenancy FAQ
          </button>
          <button 
            className={`agent-btn ${activeAgent === 'diagnose' ? 'active' : ''}`} 
            onClick={() => setActiveAgent('diagnose')}
          >
            Issue Detection
          </button>
        </div>
      </header>

      <main>
        <div className="chat-container">
          <ChatHistory history={chatHistory} />
        </div>
        
        <div className="agent-info-container">
          {activeAgent === 'auto' && (
            <div className="agent-info">
              <h3>Auto Detection Mode</h3>
              <p>Your query will be analyzed and routed to the most appropriate agent.</p>
              <p>Include an image to use the Image Analysis agent.</p>
              <ul className="features-list">
              <li>Automatically detects intent and routes your request smartly</li>
              <li>Supports both image uploads and text-based interactions</li>
              <li>Optimized for speed, accuracy, and intelligent fallback</li>
        </ul>
            </div>
          )}
          
          {activeAgent === 'image' && (
            <ImageAnalysisAgent />
          )}
          
          {activeAgent === 'faq' && (
            <FaqAgent />
          )}
          
          {activeAgent === 'diagnose' && (
            <DiagnoseAgent />
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="input-container">
          {imagePreview && (
            <div className="image-preview-container">
              <img src={imagePreview} alt="Preview" className="image-preview" />
              <button type="button" className="remove-image-btn" onClick={removeImage}>
                ×
              </button>
            </div>
          )}
          
          <div className="input-wrapper">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message here..."
              disabled={isLoading}
            />
            
            {(activeAgent === 'auto' || activeAgent === 'image') && (
  <CameraButton 
    onClick={() => fileInputRef.current.click()} 
    disabled={isLoading} 
  />
)}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            
            <SendButton
          isLoading={isLoading}
          disabled={isLoading || (!inputText.trim() && !selectedImage)}
        />
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;