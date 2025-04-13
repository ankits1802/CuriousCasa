import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatHistory({ history }) {
  const styles = {
    emptyChat: {
      textAlign: 'center',
      padding: '2rem',
      color: '#444'
    },
    messages: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem'
    },
    message: {
      padding: '1rem',
      borderRadius: '10px',
      maxWidth: '90%',
      wordBreak: 'break-word'
    },
    userMessage: {
      backgroundColor: '#e0f7fa',
      alignSelf: 'flex-end'
    },
    botMessage: {
      backgroundColor: '#f0f0f0',
      alignSelf: 'flex-start'
    },
    errorMessage: {
      border: '1px solid red',
      backgroundColor: '#ffe6e6'
    },
    messageHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.8rem',
      marginBottom: '0.5rem',
      fontWeight: 'bold'
    },
    messageImage: {
      marginBottom: '0.5rem'
    },
    image: {
      maxWidth: '100%',
      borderRadius: '8px'
    },
    markdown: {
      lineHeight: '1.6',
      fontSize: '1rem'
    },
    h1: { fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5em 0' },
    h2: { fontSize: '1.3rem', fontWeight: 'bold', margin: '0.5em 0' },
    h3: { fontSize: '1.1rem', fontWeight: 'bold', margin: '0.5em 0' },
    p: { margin: '0.5em 0' },
    ul: { paddingLeft: '1.5em', margin: '0.5em 0' },
    ol: { paddingLeft: '1.5em', margin: '0.5em 0' },
    li: { marginBottom: '0.3em' },
    pre: {
      backgroundColor: '#f4f4f4',
      padding: '0.75em',
      borderRadius: '5px',
      overflowX: 'auto',
      fontSize: '0.95em'
    },
    code: {
      backgroundColor: '#eee',
      padding: '2px 4px',
      borderRadius: '3px',
      fontFamily: 'monospace'
    }
  };

  if (!history.length) {
    return (
      <div style={styles.emptyChat}>
        <h2 style={{ color: '#4b6cb7' }}>Welcome to <strong>CuriousCasa</strong> — Your AI Home Ally</h2>
        <p>Uncover insights, solve home mysteries, or report issues — all with a single message or image.</p>
        <p>Ready when you are. Just ask away or upload a photo to begin your journey.</p>
      </div>
    );
  }

  return (
    <div style={styles.messages}>
      {history.map((message, index) => {
        const roleStyle = message.role === 'user' ? styles.userMessage : styles.botMessage;
        const errorStyle = message.error ? styles.errorMessage : {};
        const combinedStyle = { ...styles.message, ...roleStyle, ...errorStyle };

        return (
          <div key={index} style={combinedStyle}>
            <div style={styles.messageHeader}>
              <span>{message.role === 'user' ? 'You' : 'Assistant'}</span>
              {message.agentType && (
                <span>
                  {message.agentType === 'image' && '🖼️ Image Analysis'}
                  {message.agentType === 'faq' && '📚 Tenancy FAQ'}
                  {message.agentType === 'diagnose' && '🔍 Issue Detection'}
                </span>
              )}
              <span>
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>

            {message.image && (
              <div style={styles.messageImage}>
                <img src={message.image} alt="User uploaded" style={styles.image} />
              </div>
            )}

            <div style={styles.markdown}>
              {message.role === 'user' ? (
                <p>{message.text}</p>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => <h1 style={styles.h1} {...props} />,
                    h2: ({ node, ...props }) => <h2 style={styles.h2} {...props} />,
                    h3: ({ node, ...props }) => <h3 style={styles.h3} {...props} />,
                    p: ({ node, ...props }) => <p style={styles.p} {...props} />,
                    ul: ({ node, ...props }) => <ul style={styles.ul} {...props} />,
                    ol: ({ node, ...props }) => <ol style={styles.ol} {...props} />,
                    li: ({ node, ...props }) => <li style={styles.li} {...props} />,
                    pre: ({ node, ...props }) => <pre style={styles.pre} {...props} />,
                    code: ({ node, ...props }) => <code style={styles.code} {...props} />
                  }}
                >
                  {message.text}
                </ReactMarkdown>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
