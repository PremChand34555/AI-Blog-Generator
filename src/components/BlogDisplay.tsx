import React, { useState } from 'react';
import { Blog } from '../types';

interface BlogDisplayProps {
  blog: Blog;
  onNewBlog: () => void;
}

const BlogDisplay: React.FC<BlogDisplayProps> = ({ blog, onNewBlog }) => {
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(blog.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to convert markdown-like content to JSX
  const renderContent = () => {
    if (!blog.content) return null;
    
    // Split content by lines
    const lines = blog.content.split('\n');
    
    return lines.map((line, index) => {
      // Handle headings (# Heading)
      if (line.startsWith('# ')) {
        return <h1 key={index}>{line.substring(2)}</h1>;
      }
      // Handle subheadings (## Subheading)
      else if (line.startsWith('## ')) {
        return <h2 key={index}>{line.substring(3)}</h2>;
      }
      // Handle smaller headings (### Heading)
      else if (line.startsWith('### ')) {
        return <h3 key={index}>{line.substring(4)}</h3>;
      }
      // Handle empty lines
      else if (line.trim() === '') {
        return <div style={{ height: '1rem' }} key={index}></div>;
      }
      // Handle bullet points
      else if (line.trim().startsWith('- ')) {
        return <li key={index}>{line.substring(2)}</li>;
      }
      // Handle numbered lists
      else if (/^\d+\.\s/.test(line.trim())) {
        const content = line.trim().replace(/^\d+\.\s/, '');
        return <li key={index}>{content}</li>;
      }
      // Regular paragraph
      else {
        return <p key={index}>{line}</p>;
      }
    });
  };

  const handleShare = (platform: string) => {
    const blogUrl = window.location.href;
    const text = `Check out this blog about ${blog.title}`;
    
    let shareUrl = '';
    
    switch(platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(blogUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="blog-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>{blog.title || 'Generated Blog'}</h2>
        <div>
          <button 
            onClick={() => setShowShareOptions(!showShareOptions)} 
            style={{ 
              background: 'transparent', 
              color: '#4f56ff',
              boxShadow: 'none',
              padding: '5px 10px'
            }}
          >
            Share
          </button>
          {showShareOptions && (
            <div style={{ 
              position: 'absolute', 
              background: 'white', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              borderRadius: '4px',
              padding: '0.5rem',
              zIndex: 10
            }}>
              <button onClick={() => handleShare('twitter')} style={{ width: '100%', marginBottom: '0.5rem', textAlign: 'left' }}>Twitter</button>
              <button onClick={() => handleShare('facebook')} style={{ width: '100%', marginBottom: '0.5rem', textAlign: 'left' }}>Facebook</button>
              <button onClick={() => handleShare('linkedin')} style={{ width: '100%', textAlign: 'left' }}>LinkedIn</button>
            </div>
          )}
        </div>
      </div>
      
      <div className="blog-content">
        {renderContent()}
      </div>
      
      <hr className="divider" />
      
      <div className="button-container">
        <button onClick={onNewBlog}>
          Generate New Blog
        </button>
        <button onClick={handleCopy} className="copy-button">
          {copied ? 'Copied!' : 'Copy Content'}
        </button>
      </div>
    </div>
  );
};

export default BlogDisplay; 